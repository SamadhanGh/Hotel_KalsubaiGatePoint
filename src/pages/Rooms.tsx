import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Wifi, 
  Car, 
  Coffee,
  Star,
  Calendar,
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { Room, CreateBooking, Booking } from '../types/room';
import { roomApi } from '../utils/roomApi';
import PaymentModal from '../components/PaymentModal';
import toast from 'react-hot-toast';
import { format, differenceInDays } from 'date-fns';

const Rooms = () => {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const [bookingData, setBookingData] = useState<CreateBooking>({
    roomId: 0,
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const roomData = await roomApi.getAllRooms();
      setRooms(roomData.filter(room => room.isAvailable));
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setBookingData({ ...bookingData, roomId: room.id });
    setShowBookingModal(true);
  };

  const calculateTotal = () => {
    if (!selectedRoom || !bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = differenceInDays(checkOut, checkIn);
    
    return nights > 0 ? nights * selectedRoom.pricePerNight : 0;
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    setBookingLoading(true);
    try {
      // Check availability
      const isAvailable = await roomApi.checkAvailability(
        selectedRoom.id,
        bookingData.checkInDate,
        bookingData.checkOutDate
      );

      if (!isAvailable) {
        toast.error('Room is not available for selected dates');
        return;
      }

      // Create booking
      const booking = await roomApi.createBooking(bookingData);
      setCurrentBooking(booking);
      
      // Close booking modal and open payment modal
      setShowBookingModal(false);
      setShowPaymentModal(true);
      
      toast.success('Booking created! Please complete payment.');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(t('rooms.booking.booking_error'));
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment successful! Booking confirmed.');
    resetBookingForm();
  };

  const resetBookingForm = () => {
    setBookingData({
      roomId: 0,
      guestName: '',
      guestPhone: '',
      guestEmail: '',
      checkInDate: '',
      checkOutDate: '',
      specialRequests: ''
    });
    setSelectedRoom(null);
    setCurrentBooking(null);
    setShowBookingModal(false);
    setShowPaymentModal(false);
  };

  const BookingModal = () => (
    <AnimatePresence>
      {showBookingModal && selectedRoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={resetBookingForm}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{t('rooms.booking.title')}</h2>
              <button
                onClick={resetBookingForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Room Summary */}
            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{selectedRoom.name}</h3>
                  <p className="text-gray-600">{t(`rooms.room_types.${selectedRoom.type}`)}</p>
                  <p className="text-amber-600 font-semibold">₹{selectedRoom.pricePerNight} {t('rooms.per_night')}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('rooms.booking.guest_details')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      {t('rooms.booking.guest_name')}
                    </label>
                    <input
                      type="text"
                      value={bookingData.guestName}
                      onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder={t('rooms.booking.guest_name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      {t('rooms.booking.guest_email')}
                    </label>
                    <input
                      type="email"
                      value={bookingData.guestEmail}
                      onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder={t('rooms.booking.guest_email')}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    {t('rooms.booking.guest_phone')}
                  </label>
                  <input
                    type="tel"
                    value={bookingData.guestPhone}
                    onChange={(e) => setBookingData({ ...bookingData, guestPhone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {t('rooms.booking.check_in')}
                  </label>
                  <input
                    type="date"
                    value={bookingData.checkInDate}
                    onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                    required
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {t('rooms.booking.check_out')}
                  </label>
                  <input
                    type="date"
                    value={bookingData.checkOutDate}
                    onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                    required
                    min={bookingData.checkInDate || format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  {t('rooms.booking.special_requests')}
                </label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={t('rooms.booking.special_requests')}
                />
              </div>

              {/* Total Amount */}
              {bookingData.checkInDate && bookingData.checkOutDate && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">{t('rooms.booking.total_amount')}:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">₹{calculateTotal()}</div>
                      <div className="text-sm text-gray-600">
                        {differenceInDays(new Date(bookingData.checkOutDate), new Date(bookingData.checkInDate))} {t('rooms.booking.nights')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={bookingLoading || calculateTotal() === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {bookingLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Booking...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>{t('rooms.booking.proceed_payment')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('rooms.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('rooms.subtitle')}
          </p>
        </motion.div>

        {/* Rooms Grid */}
        {rooms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 text-lg">No rooms available at the moment.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                    {t(`rooms.room_types.${room.type}`)}
                  </div>
                  <div className="absolute top-4 right-4 bg-amber-600 text-white rounded-full px-3 py-1 text-sm font-bold">
                    ₹{room.pricePerNight}/{t('rooms.per_night')}
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                  {/* Room Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{t('rooms.max_occupancy')}: {room.maxOccupancy}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">{t('common.amenities')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs flex items-center space-x-1"
                        >
                          {amenity.includes('WiFi') && <Wifi className="h-3 w-3" />}
                          {amenity.includes('Parking') && <Car className="h-3 w-3" />}
                          {amenity.includes('Service') && <Coffee className="h-3 w-3" />}
                          <span>{amenity}</span>
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    onClick={() => handleBookRoom(room)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                  >
                    {t('rooms.book_room')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BookingModal />
      
      {currentBooking && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          booking={currentBooking}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </motion.div>
  );
};

export default Rooms;