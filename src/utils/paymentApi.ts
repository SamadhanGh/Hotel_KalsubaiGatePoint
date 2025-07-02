// Payment gateway integration (Razorpay mock)
export interface PaymentOptions {
  amount: number;
  currency: string;
  orderId: string;
  bookingId: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId: string;
  error?: string;
}

export const paymentApi = {
  // Initialize payment
  initializePayment: async (options: PaymentOptions): Promise<string> => {
    // In production, this would create a Razorpay order
    console.log('Initializing payment:', options);
    return Promise.resolve(`order_${Date.now()}`);
  },

  // Process payment
  processPayment: async (options: PaymentOptions): Promise<PaymentResult> => {
    // Mock payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        const success = Math.random() > 0.1;
        
        if (success) {
          resolve({
            success: true,
            paymentId: `pay_${Date.now()}`,
            orderId: options.orderId
          });
        } else {
          resolve({
            success: false,
            orderId: options.orderId,
            error: 'Payment failed. Please try again.'
          });
        }
      }, 2000);
    });
  },

  // Verify payment
  verifyPayment: async (paymentId: string, orderId: string): Promise<boolean> => {
    // In production, this would verify with Razorpay
    console.log('Verifying payment:', paymentId, orderId);
    return Promise.resolve(true);
  }
};