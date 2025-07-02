import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Tent, X, Sparkles } from 'lucide-react';
import FAQModal from './FAQModal';
import CampingInfoModal from './CampingInfoModal';

const CampBuddyButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showCampInfo, setShowCampInfo] = useState(false);

  const handleOptionClick = (option: 'faq' | 'camp') => {
    setIsExpanded(false);
    if (option === 'faq') {
      setShowFAQ(true);
    } else {
      setShowCampInfo(true);
    }
  };

  return (
    <>
      {/* Main Floating Button */}
      <div className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-14 z-50">

        <motion.div
          className="relative"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Magical Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-75 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Sparkle Particles */}
          <motion.div
            className="absolute -inset-4"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}px`,
                  left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}px`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Main Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden group"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.4)",
                "0 0 40px rgba(147, 51, 234, 0.6)",
                "0 0 20px rgba(147, 51, 234, 0.4)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
            
            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <X className="h-6 w-6" />
              ) : (
                <Sparkles className="h-6 w-6" />
              )}
            </motion.div>

            {/* Hover Sparkles */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Expanded Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-20 right-0 space-y-3"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              {/* FAQ Option */}
              <motion.button
                onClick={() => handleOptionClick('faq')}
                className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.05,
                  x: -5,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Compass className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium whitespace-nowrap">FAQ</span>
              </motion.button>

              {/* Camping Info Option */}
              <motion.button
                onClick={() => handleOptionClick('camp')}
                className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.05,
                  x: -5,
                  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Tent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium whitespace-nowrap">Trekking & Camping</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
      <CampingInfoModal isOpen={showCampInfo} onClose={() => setShowCampInfo(false)} />
    </>
  );
};

export default CampBuddyButton;