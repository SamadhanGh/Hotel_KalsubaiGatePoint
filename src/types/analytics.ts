export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
}

export interface MonthlyBookingData {
  month: string;
  bookings: number;
  revenue: number;
}

export interface RoomPopularity {
  roomType: string;
  bookings: number;
  revenue: number;
}

export interface AnalyticsData {
  stats: BookingStats;
  monthlyData: MonthlyBookingData[];
  roomPopularity: RoomPopularity[];
  recentBookings: Booking[];
}