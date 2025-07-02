import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LogOut, 
  Settings, 
  Users, 
  Camera, 
  Utensils, 
  Bed, 
  CreditCard, 
  Star,
  Lock,
  Crown,
  X,
  FileText,
  Calendar,
  BarChart3
} from 'lucide-react';
import BlogManager from '../../components/admin/BlogManager';
import MenuManager from '../../components/admin/MenuManager';
import RoomManager from '../../components/admin/RoomManager';
import BookingManager from '../../components/admin/BookingManager';
import ReviewsManager from '../../components/admin/ReviewsManager';
import AnalyticsManager from '../../components/admin/AnalyticsManager';
import BookingCalendar from '../../components/admin/BookingCalendar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProModal, setShowProModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const ProModal = () => (
    <AnimatePresence>
      {showProModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg"
              >
                <Crown className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Pro Version Required</h2>
              <p className="text-gray-600 mb-8">
                Unlock advanced features with our Pro version of Hotel Management System.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Advanced Room Booking Management',
                  'Payment Gateway Integration', 
                  'Multi-language Support',
                  'Advanced Analytics & Reports'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center text-sm text-gray-600"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Maybe Later
                </button>
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white py-3 px-4 rounded-xl cursor-not-allowed font-semibold"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const menuItems = [
    { id: 'overview', name: t('admin.dashboard'), icon: <Settings className="h-5 w-5" /> },
    { id: 'rooms', name: t('admin.rooms_management'), icon: <Bed className="h-5 w-5" /> },
    { id: 'bookings', name: t('admin.bookings_management'), icon: <Calendar className="h-5 w-5" /> },
    { id: 'menu', name: 'Menu Management', icon: <Utensils className="h-5 w-5" /> },
    { id: 'gallery', name: 'Gallery Management', icon: <Camera className="h-5 w-5" /> },
    { id: 'blog', name: 'Blog Manager', icon: <FileText className="h-5 w-5" /> },
    { id: 'reviews', name: t('admin.reviews_management'), icon: <Star className="h-5 w-5" /> },
    { id: 'analytics', name: t('admin.analytics'), icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'calendar', name: t('admin.calendar'), icon: <Calendar className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Bookings', value: '127', icon: Bed, color: 'from-blue-500 to-blue-600' },
                { title: 'Total Rooms', value: '12', icon: Bed, color: 'from-purple-500 to-purple-600' },
                { title: 'Menu Items', value: '45', icon: Utensils, color: 'from-green-500 to-green-600' },
                { title: 'Gallery Images', value: '89', icon: Camera, color: 'from-amber-500 to-amber-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Add Room', desc: 'Add new room to inventory', action: () => setActiveTab('rooms') },
                  { title: 'View Bookings', desc: 'Manage room bookings', action: () => setActiveTab('bookings') },
                  { title: 'Analytics', desc: 'View reports and analytics', action: () => setActiveTab('analytics') }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-left border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        );
      
      case 'rooms':
        return <RoomManager />;
      
      case 'bookings':
        return <BookingManager />;
      
      case 'menu':
        return <MenuManager />;
      
      case 'gallery':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery Management</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center overflow-hidden"
                >
                  <Camera className="h-8 w-8 text-gray-400" />
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Upload New Images
            </motion.button>
          </div>
        );

      case 'blog':
        return <BlogManager />;

      case 'reviews':
        return <ReviewsManager />;

      case 'analytics':
        return <AnalyticsManager />;

      case 'calendar':
        return <BookingCalendar />;
      
      default:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="h-10 w-10 text-gray-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Feature Locked</h2>
            <p className="text-gray-600 mb-6">This feature is available in the Pro version.</p>
            <motion.button
              onClick={() => setShowProModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {t('admin.dashboard')}
              </h1>
              <p className="text-gray-600 mt-1">Hotel Kalsubai Gate Point</p>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center space-x-2 shadow-lg"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className={activeTab === item.id ? 'text-white' : ''}>{item.icon}</span>
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProModal />
    </motion.div>
  );
};

export default AdminDashboard;