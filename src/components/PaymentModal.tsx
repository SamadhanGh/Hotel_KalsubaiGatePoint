import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  X, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Booking } from '../types/room';
import { razorpayApi, RazorpayResponse } from '../utils/razorpayApi';
import { invoiceGenerator, InvoiceData } from '../utils/invoiceGenerator';
import { roomApi } from '../utils/roomApi';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onPaymentSuccess: (paymentId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  booking,
  onPaymentSuccess
}) => {
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string>('');

  const handlePayment = async () => {
    setProcessing(true);

    try {
      // Create Razorpay order
      const orderData = {
        amount: booking.totalAmount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `booking_${booking.id}`,
        bookingId: booking.id
      };

      const order = await razorpayApi.createOrder(orderData);

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_key',
        amount: order.amount,
        currency: order.currency,
        name: 'Hotel Kalsubai Gate Point',
        description: `Booking for ${booking.room?.name || 'Room'}`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id
            };

            const verification = await razorpayApi.verifyPayment(verificationData);

            if (verification.success) {
              // Update booking payment status
              await roomApi.updatePaymentStatus(booking.id, 'paid', response.razorpay_payment_id);
              
              setPaymentId(response.razorpay_payment_id);
              setPaymentSuccess(true);
              onPaymentSuccess(response.razorpay_payment_id);
              
              toast.success('Payment successful!');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: booking.guestName,
          email: booking.guestEmail,
          contact: booking.guestPhone
        },
        theme: {
          color: '#f59e0b'
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };

      await razorpayApi.initializePayment(options);
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initialize payment');
      setProcessing(false);
    }
  };

  const downloadInvoice = async () => {
    try {
      const invoiceData: InvoiceData = {
        booking: {
          ...booking,
          paymentId
        },
        paymentId,
        invoiceNumber: invoiceGenerator.generateInvoiceNumber(booking.id),
        invoiceDate: new Date().toLocaleDateString(),
        hotelDetails: {
          name: 'Hotel Kalsubai Gate Point',
          address: 'Near Kalsubai Peak Base, Akole, Ahmednagar, Maharashtra 422601',
          phone: '+91 98765 43210',
          email: 'info@hotelkalsubai.com',
          gst: 'GST123456789'
        }
      };

      await invoiceGenerator.downloadInvoice(invoiceData);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Invoice download error:', error);
      toast.error('Failed to download invoice');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {paymentSuccess ? 'Payment Successful!' : 'Complete Payment'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {paymentSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 1,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-600">
                    Your payment has been processed successfully.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Payment ID: {paymentId}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Booking Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Booking ID: {booking.id}</p>
                    <p>Room: {booking.room?.name || `Room ${booking.roomId}`}</p>
                    <p>Amount: ₹{booking.totalAmount}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    onClick={downloadInvoice}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Invoice</span>
                  </motion.button>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Booking Summary */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{booking.room?.name || `Room ${booking.roomId}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guest:</span>
                      <span className="font-medium">{booking.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span className="text-amber-600">₹{booking.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">Secure Payment</p>
                    <p className="text-blue-600">Your payment is protected by Razorpay</p>
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  onClick={handlePayment}
                  disabled={processing}
                  whileHover={{ scale: processing ? 1 : 1.02 }}
                  whileTap={{ scale: processing ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Pay ₹{booking.totalAmount}</span>
                    </>
                  )}
                </motion.button>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Accepted Payment Methods</p>
                  <div className="flex justify-center space-x-2 text-xs text-gray-400">
                    <span>Credit Card</span>
                    <span>•</span>
                    <span>Debit Card</span>
                    <span>•</span>
                    <span>UPI</span>
                    <span>•</span>
                    <span>Net Banking</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;