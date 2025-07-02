export interface Feedback {
  id: number;
  guestName: string;
  guestEmail?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface CreateFeedback {
  guestName: string;
  guestEmail?: string;
  rating: number;
  comment: string;
}