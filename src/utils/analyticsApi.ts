import { AnalyticsData, BookingStats, MonthlyBookingData, RoomPopularity } from '../types/analytics';
import { roomApi } from './roomApi';
import { feedbackApi } from './feedbackApi';

// Mock analytics data
const mockMonthlyData: MonthlyBookingData[] = [
  { month: 'Jan', bookings: 25, revenue: 125000 },
  { month: 'Feb', bookings: 30, revenue: 150000 },
  { month: 'Mar', bookings: 35, revenue: 175000 },
  { month: 'Apr', bookings: 28, revenue: 140000 },
  { month: 'May', bookings: 32, revenue: 160000 },
  { month: 'Jun', bookings: 40, revenue: 200000 },
  { month: 'Jul', bookings: 45, revenue: 225000 },
  { month: 'Aug', bookings: 42, revenue: 210000 },
  { month: 'Sep', bookings: 38, revenue: 190000 },
  { month: 'Oct', bookings: 35, revenue: 175000 },
  { month: 'Nov', bookings: 30, revenue: 150000 },
  { month: 'Dec', bookings: 33, revenue: 165000 }
];

const mockRoomPopularity: RoomPopularity[] = [
  { roomType: 'Standard', bookings: 180, revenue: 450000 },
  { roomType: 'Deluxe', bookings: 120, revenue: 420000 },
  { roomType: 'Suite', bookings: 73, revenue: 365000 }
];

export const analyticsApi = {
  // Get complete analytics data
  getAnalyticsData: async (): Promise<AnalyticsData> => {
    const [bookings, averageRating] = await Promise.all([
      roomApi.getAllBookings(),
      feedbackApi.getAverageRating()
    ]);

    const totalBookings = mockMonthlyData.reduce((sum, month) => sum + month.bookings, 0);
    const totalRevenue = mockMonthlyData.reduce((sum, month) => sum + month.revenue, 0);
    const occupancyRate = 75; // Mock occupancy rate

    const stats: BookingStats = {
      totalBookings,
      totalRevenue,
      averageRating,
      occupancyRate
    };

    const recentBookings = bookings.slice(0, 5);

    return Promise.resolve({
      stats,
      monthlyData: mockMonthlyData,
      roomPopularity: mockRoomPopularity,
      recentBookings
    });
  },

  // Export analytics report
  exportReport: async (format: 'pdf' | 'excel'): Promise<string> => {
    // In production, this would generate and return a download URL
    console.log(`Exporting analytics report in ${format} format`);
    return Promise.resolve(`/reports/analytics-${Date.now()}.${format}`);
  }
};