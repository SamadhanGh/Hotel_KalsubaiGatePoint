import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';
import { Booking } from '../../types/room';
import { roomApi } from '../../utils/roomApi';
import { format, isSameDay, parseISO } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    // Filter bookings for selected date
    const dayBookings = bookings.filter(booking => {
      const checkIn = parseISO(booking.checkInDate);
      const checkOut = parseISO(booking.checkOutDate);
      return selectedDate >= checkIn && selectedDate < checkOut;
    });
    setSelectedBookings(dayBookings);
  }, [selectedDate, bookings]);

  const fetchBookings = async () => {
    try {
      const bookingData = await roomApi.getAllBookings();
      setBookings(bookingData.filter(b => b.status !== 'cancelled'));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayBookings = bookings.filter(booking => {
        const checkIn = parseISO(booking.checkInDate);
        const checkOut = parseISO(booking.checkOutDate);
        return date >= checkIn && date < checkOut;
      });

      if (dayBookings.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className={`w-2 h-2 rounded-full ${
              dayBookings.length === 1 ? 'bg-green-500' :
              dayBookings.length === 2 ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayBookings = bookings.filter(booking => {
        const checkIn = parseISO(booking.checkInDate);
        const checkOut = parseISO(booking.checkOutDate);
        return date >= checkIn && date < checkOut;
      });

      if (dayBookings.length > 0) {
        return 'has-bookings';
      }
    }
    return '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-6 w-6 text-amber-600" />
        <h2 className="text-2xl font-bold text-gray-800">Booking Calendar</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
        >
          <style jsx>{`
            .react-calendar {
              width: 100%;
              background: white;
              border: none;
              font-family: inherit;
            }
            .react-calendar__tile {
              position: relative;
              padding: 0.75em 0.5em;
              background: none;
              border: none;
              font-size: 0.875rem;
            }
            .react-calendar__tile:enabled:hover,
            .react-calendar__tile:enabled:focus {
              background-color: #fef3c7;
            }
            .react-calendar__tile--active {
              background: #f59e0b !important;
              color: white;
            }
            .react-calendar__tile.has-bookings {
              background-color: #fef3c7;
            }
            .react-calendar__navigation button {
              color: #374151;
              font-size: 1rem;
              font-weight: 600;
            }
            .react-calendar__navigation button:enabled:hover,
            .react-calendar__navigation button:enabled:focus {
              background-color: #fef3c7;
            }
          `}</style>
          <Calendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            className="w-full"
          />
          
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>1 Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>2 Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>3+ Bookings</span>
            </div>
          </div>
        </motion.div>

        {/* Selected Date Bookings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {format(selectedDate, 'MMMM dd, yyyy')}
          </h3>
          
          {selectedBookings.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No bookings for this date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">
                        {booking.room?.name || `Room ${booking.roomId}`}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{booking.guestName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{booking.guestPhone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{booking.guestEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>₹{booking.totalAmount}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      {format(parseISO(booking.checkInDate), 'MMM dd')} - {format(parseISO(booking.checkOutDate), 'MMM dd')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Today\'s Bookings',
            value: bookings.filter(b => isSameDay(parseISO(b.checkInDate), new Date()) || 
                                         isSameDay(parseISO(b.checkOutDate), new Date())).length,
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'This Month',
            value: bookings.filter(b => {
              const checkIn = parseISO(b.checkInDate);
              return checkIn.getMonth() === new Date().getMonth() && 
                     checkIn.getFullYear() === new Date().getFullYear();
            }).length,
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Upcoming Check-ins',
            value: bookings.filter(b => {
              const checkIn = parseISO(b.checkInDate);
              return checkIn > new Date() && b.status === 'confirmed';
            }).length,
            color: 'from-purple-500 to-purple-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{stat.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BookingCalendar;