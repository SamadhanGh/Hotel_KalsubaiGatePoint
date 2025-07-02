import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  User, 
  Calendar, 
  MessageSquare,
  Send,
  Mail
} from 'lucide-react';
import { Feedback, CreateFeedback } from '../types/feedback';
import { feedbackApi } from '../utils/feedbackApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Reviews = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const [reviewData, setReviewData] = useState<CreateFeedback>({
    guestName: '',
    guestEmail: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
    fetchAverageRating();
  }, []);

  const fetchReviews = async () => {
    try {
      const reviewData = await feedbackApi.getApprovedFeedback();
      setReviews(reviewData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const rating = await feedbackApi.getAverageRating();
      setAverageRating(rating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await feedbackApi.createFeedback(reviewData);
      toast.success(t('reviews.review_success'));
      setReviewData({
        guestName: '',
        guestEmail: '',
        rating: 5,
        comment: ''
      });
      setShowWriteReview(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const WriteReviewModal = () => (
    <AnimatePresence>
      {showWriteReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWriteReview(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('reviews.write_review')}</h2>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  {t('reviews.your_name')}
                </label>
                <input
                  type="text"
                  value={reviewData.guestName}
                  onChange={(e) => setReviewData({ ...reviewData, guestName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={t('reviews.your_name')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  {t('reviews.your_email')}
                </label>
                <input
                  type="email"
                  value={reviewData.guestEmail}
                  onChange={(e) => setReviewData({ ...reviewData, guestEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={t('reviews.your_email')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('reviews.your_rating')}
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= reviewData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  {t('reviews.your_comment')}
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder={t('reviews.your_comment')}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t('reviews.submit_review')}</span>
                    </>
                  )}
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  {t('common.cancel')}
                </button>
              </div>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('reviews.title')}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {t('reviews.subtitle')}
          </p>

          {/* Average Rating */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating), 'lg')}
              </div>
              <div className="text-sm text-gray-600">{reviews.length} {t('common.reviews')}</div>
            </div>
          </div>

          <motion.button
            onClick={() => setShowWriteReview(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            {t('reviews.write_review')}
          </motion.button>
        </motion.div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('reviews.no_reviews')}</h3>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{review.guestName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <WriteReviewModal />
    </motion.div>
  );
};

export default Reviews;