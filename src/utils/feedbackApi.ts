import { Feedback, CreateFeedback } from '../types/feedback';

// Mock data for development
const mockFeedback: Feedback[] = [
  {
    id: 1,
    guestName: "Priya Sharma",
    guestEmail: "priya@example.com",
    rating: 5,
    comment: "Amazing experience! The views from our room were breathtaking and the staff was incredibly helpful. The food was delicious and authentic. Highly recommend for anyone visiting Kalsubai.",
    isApproved: true,
    createdAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 2,
    guestName: "Rajesh Patil",
    guestEmail: "rajesh@example.com",
    rating: 4,
    comment: "Great location for trekking Kalsubai. Clean rooms and good service. The bonfire evening was a highlight of our stay. Will definitely come back!",
    isApproved: true,
    createdAt: "2024-01-18T09:15:00Z"
  },
  {
    id: 3,
    guestName: "Amit Kumar",
    guestEmail: "amit@example.com",
    rating: 5,
    comment: "Perfect base for our Kalsubai trek. The hotel provided excellent guidance and the rooms were comfortable. The local cuisine was outstanding!",
    isApproved: true,
    createdAt: "2024-01-15T16:45:00Z"
  }
];

export const feedbackApi = {
  // Get all approved feedback
  getApprovedFeedback: async (): Promise<Feedback[]> => {
    const approvedFeedback = mockFeedback.filter(f => f.isApproved);
    return Promise.resolve(approvedFeedback.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  },

  // Get all feedback (admin only)
  getAllFeedback: async (): Promise<Feedback[]> => {
    return Promise.resolve(mockFeedback.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  },

  // Create new feedback
  createFeedback: async (feedbackData: CreateFeedback): Promise<Feedback> => {
    const newFeedback: Feedback = {
      id: Date.now(),
      ...feedbackData,
      isApproved: false, // Requires admin approval
      createdAt: new Date().toISOString()
    };
    mockFeedback.push(newFeedback);
    return Promise.resolve(newFeedback);
  },

  // Approve feedback (admin only)
  approveFeedback: async (id: number): Promise<Feedback> => {
    const feedbackIndex = mockFeedback.findIndex(f => f.id === id);
    if (feedbackIndex !== -1) {
      mockFeedback[feedbackIndex].isApproved = true;
      return Promise.resolve(mockFeedback[feedbackIndex]);
    }
    throw new Error('Feedback not found');
  },

  // Delete feedback (admin only)
  deleteFeedback: async (id: number): Promise<void> => {
    const feedbackIndex = mockFeedback.findIndex(f => f.id === id);
    if (feedbackIndex !== -1) {
      mockFeedback.splice(feedbackIndex, 1);
    }
    return Promise.resolve();
  },

  // Get average rating
  getAverageRating: async (): Promise<number> => {
    const approvedFeedback = mockFeedback.filter(f => f.isApproved);
    if (approvedFeedback.length === 0) return 0;
    
    const totalRating = approvedFeedback.reduce((sum, f) => sum + f.rating, 0);
    return Promise.resolve(Math.round((totalRating / approvedFeedback.length) * 10) / 10);
  }
};