import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  User, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Trash2,
  Filter
} from 'lucide-react';
import { Feedback } from '../../types/feedback';
import { feedbackApi } from '../../utils/feedbackApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;
    
    if (filter === 'approved') {
      filtered = reviews.filter(review => review.isApproved);
    } else if (filter === 'pending') {
      filtered = reviews.filter(review => !review.isApproved);
    }
    
    setFilteredReviews(filtered);
  }, [reviews, filter]);

  const fetchReviews = async () => {
    try {
      const reviewData = await feedbackApi.getAllFeedback();
      setReviews(reviewData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id: number) => {
    try {
      await feedbackApi.approveFeedback(id);
      await fetchReviews();
      toast.success('Review approved successfully');
    } catch (error) {
      console.error('Error approving review:', error);
      toast.error('Failed to approve review');
    }
  };

  const deleteReview = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await feedbackApi.deleteFeedback(id);
        await fetchReviews();
        toast.success('Review deleted successfully');
      } catch (error) {
        console.error('Error deleting review:', error);
        toast.error('Failed to delete review');
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Reviews Management</h2>
        <div className="text-sm text-gray-600">
          Total Reviews: {reviews.length}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'approved' | 'pending')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-lg"
        >
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
          <p className="text-gray-600">
            {filter === 'pending' 
              ? 'No reviews pending approval' 
              : filter === 'approved'
              ? 'No approved reviews yet'
              : 'Reviews will appear here once guests submit feedback'
            }
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                review.isApproved ? 'border-green-500' : 'border-yellow-500'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.guestName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  review.isApproved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.isApproved ? 'Approved' : 'Pending'}
                </span>

                <div className="flex space-x-2">
                  {!review.isApproved && (
                    <button
                      onClick={() => approveReview(review.id)}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Approve Review"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete Review"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsManager;