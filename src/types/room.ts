export interface Room {
  id: number;
  name: string;
  type: 'standard' | 'deluxe' | 'suite';
  description: string;
  pricePerNight: number;
  maxOccupancy: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoom {
  name: string;
  type: 'standard' | 'deluxe' | 'suite';
  description: string;
  pricePerNight: number;
  maxOccupancy: number;
  amenities: string[];
  images: string[];
}

export interface Booking {
  id: number;
  roomId: number;
  room?: Room;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBooking {
  roomId: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

export interface BookingCalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  roomId: number;
  roomName: string;
  guestName: string;
  status: string;
}