import { Room, CreateRoom, Booking, CreateBooking } from '../types/room';

// Mock data for development
const mockRooms: Room[] = [
  {
    id: 1,
    name: "Mountain View Standard",
    type: "standard",
    description: "Comfortable standard room with beautiful mountain views and modern amenities.",
    pricePerNight: 2500,
    maxOccupancy: 2,
    amenities: ["Free WiFi", "Air Conditioning", "Mountain View", "Private Bathroom", "Room Service"],
    images: [
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
    ],
    isAvailable: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Deluxe Valley View",
    type: "deluxe",
    description: "Spacious deluxe room with panoramic valley views and premium amenities.",
    pricePerNight: 3500,
    maxOccupancy: 3,
    amenities: ["Free WiFi", "Air Conditioning", "Valley View", "Mini Bar", "Balcony", "Room Service", "Premium Bedding"],
    images: [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
    ],
    isAvailable: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Kalsubai Peak Suite",
    type: "suite",
    description: "Luxurious suite with direct views of Kalsubai Peak and exclusive amenities.",
    pricePerNight: 5000,
    maxOccupancy: 4,
    amenities: ["Free WiFi", "Air Conditioning", "Peak View", "Mini Bar", "Balcony", "Room Service", "Premium Bedding", "Living Area", "Jacuzzi"],
    images: [
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
    ],
    isAvailable: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

const mockBookings: Booking[] = [
  {
    id: 1,
    roomId: 1,
    guestName: "John Doe",
    guestPhone: "+91 9876543210",
    guestEmail: "john@example.com",
    checkInDate: "2024-02-15",
    checkOutDate: "2024-02-17",
    totalAmount: 5000,
    status: "confirmed",
    paymentStatus: "paid",
    paymentId: "pay_123456789",
    specialRequests: "Late check-in requested",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
];

export const roomApi = {
  // Get all rooms
  getAllRooms: async (): Promise<Room[]> => {
    return Promise.resolve(mockRooms);
  },

  // Get room by ID
  getRoomById: async (id: number): Promise<Room | null> => {
    const room = mockRooms.find(r => r.id === id);
    return Promise.resolve(room || null);
  },

  // Create new room (admin only)
  createRoom: async (roomData: CreateRoom): Promise<Room> => {
    const newRoom: Room = {
      id: Date.now(),
      ...roomData,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockRooms.push(newRoom);
    return Promise.resolve(newRoom);
  },

  // Update room (admin only)
  updateRoom: async (id: number, roomData: Partial<CreateRoom>): Promise<Room> => {
    const roomIndex = mockRooms.findIndex(r => r.id === id);
    if (roomIndex !== -1) {
      mockRooms[roomIndex] = {
        ...mockRooms[roomIndex],
        ...roomData,
        updatedAt: new Date().toISOString()
      };
      return Promise.resolve(mockRooms[roomIndex]);
    }
    throw new Error('Room not found');
  },

  // Delete room (admin only)
  deleteRoom: async (id: number): Promise<void> => {
    const roomIndex = mockRooms.findIndex(r => r.id === id);
    if (roomIndex !== -1) {
      mockRooms.splice(roomIndex, 1);
    }
    return Promise.resolve();
  },

  // Create booking
  createBooking: async (bookingData: CreateBooking): Promise<Booking> => {
    const room = mockRooms.find(r => r.id === bookingData.roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * room.pricePerNight;

    const newBooking: Booking = {
      id: Date.now(),
      ...bookingData,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockBookings.push(newBooking);
    return Promise.resolve(newBooking);
  },

  // Get all bookings (admin only)
  getAllBookings: async (): Promise<Booking[]> => {
    const bookingsWithRooms = mockBookings.map(booking => ({
      ...booking,
      room: mockRooms.find(r => r.id === booking.roomId)
    }));
    return Promise.resolve(bookingsWithRooms);
  },

  // Update booking status (admin only)
  updateBookingStatus: async (id: number, status: Booking['status']): Promise<Booking> => {
    const bookingIndex = mockBookings.findIndex(b => b.id === id);
    if (bookingIndex !== -1) {
      mockBookings[bookingIndex] = {
        ...mockBookings[bookingIndex],
        status,
        updatedAt: new Date().toISOString()
      };
      return Promise.resolve(mockBookings[bookingIndex]);
    }
    throw new Error('Booking not found');
  },

  // Update payment status
  updatePaymentStatus: async (id: number, paymentStatus: Booking['paymentStatus'], paymentId?: string): Promise<Booking> => {
    const bookingIndex = mockBookings.findIndex(b => b.id === id);
    if (bookingIndex !== -1) {
      mockBookings[bookingIndex] = {
        ...mockBookings[bookingIndex],
        paymentStatus,
        paymentId,
        updatedAt: new Date().toISOString()
      };
      return Promise.resolve(mockBookings[bookingIndex]);
    }
    throw new Error('Booking not found');
  },

  // Check room availability
  checkAvailability: async (roomId: number, checkIn: string, checkOut: string): Promise<boolean> => {
    // Simple availability check - in production, this would check against existing bookings
    const conflictingBookings = mockBookings.filter(booking => 
      booking.roomId === roomId &&
      booking.status !== 'cancelled' &&
      (
        (checkIn >= booking.checkInDate && checkIn < booking.checkOutDate) ||
        (checkOut > booking.checkInDate && checkOut <= booking.checkOutDate) ||
        (checkIn <= booking.checkInDate && checkOut >= booking.checkOutDate)
      )
    );
    
    return Promise.resolve(conflictingBookings.length === 0);
  }
};