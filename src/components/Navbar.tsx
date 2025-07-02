import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  Mountain, 
  Home,
  Utensils,
  Camera,
  Bed,
  Star,
  Phone,
  FileText,
  MapPin,
  ChevronDown,
  Compass,
  Gift
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: t('nav.home'), 
      path: '/', 
      icon: <Home className="h-4 w-4" />,
      description: 'Welcome to our hotel'
    },
    { 
      name: t('nav.menu'), 
      path: '/menu', 
      icon: <Utensils className="h-4 w-4" />,
      description: 'Delicious local cuisine'
    },
    { 
      name: t('nav.rooms'), 
      path: '/rooms', 
      icon: <Bed className="h-4 w-4" />,
      description: 'Comfortable accommodations'
    },
    { 
      name: 'Reviews', 
      path: '/reviews', 
      icon: <Star className="h-4 w-4" />,
      description: 'Guest experiences'
    },
    { 
      name: t('nav.contact'), 
      path: '/contact', 
      icon: <Phone className="h-4 w-4" />,
      description: 'Get in touch with us'
    }
  ];

  const exploreItems = [
    { 
      name: t('nav.gallery'), 
      path: '/gallery', 
      icon: <Camera className="h-4 w-4" />,
      description: 'Photo gallery'
    },
    { 
      name: t('nav.facilities'), 
      path: '/facilities', 
      icon: <MapPin className="h-4 w-4" />,
      description: 'Hotel amenities'
    },
    { 
      name: t('nav.blog'), 
      path: '/blog', 
      icon: <FileText className="h-4 w-4" />,
      description: 'Travel guides & tips'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Mountain className="h-6 w-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Hotel Kalsubai
                  </div>
                  <div className="text-xs text-gray-600 -mt-1">Gate Point</div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'text-amber-600 bg-amber-50 shadow-md'
                        : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    <span className={`transition-colors ${isActive(item.path) ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-500'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    
                    {/* Hover underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Explore Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowExploreDropdown(true)}
                onMouseLeave={() => setShowExploreDropdown(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 flex items-center space-x-2"
                >
                  <Compass className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  <span>Explore</span>
                  <motion.div
                    animate={{ rotate: showExploreDropdown ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showExploreDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 py-2 z-50"
                    >
                      {exploreItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 hover:bg-amber-50 transition-colors group ${
                              isActive(item.path) ? 'bg-amber-50 text-amber-600' : 'text-gray-700'
                            }`}
                            onClick={() => setShowExploreDropdown(false)}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${
                              isActive(item.path) 
                                ? 'bg-amber-100 text-amber-600' 
                                : 'bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-600'
                            }`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              {/* Special Offers Badge */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="hidden md:block"
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                  <Gift className="h-3 w-3" />
                  <span>Special Offers</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/admin/login"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {t('nav.admin')}
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-700 hover:text-amber-600 focus:outline-none focus:text-amber-600 rounded-lg hover:bg-amber-50 transition-all"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {[...navItems, ...exploreItems].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive(item.path)
                          ? 'text-amber-600 bg-amber-50 shadow-md'
                          : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                    >
                      <span className={`transition-colors ${isActive(item.path) ? 'text-amber-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </span>
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + exploreItems.length) * 0.1 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    <span>{t('nav.admin')}</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;