import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Mountain, Clock, Backpack, Calendar, DollarSign } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "What is Kalsubai?",
      icon: <Mountain className="h-5 w-5" />,
      answer: "Kalsubai is the highest peak in Maharashtra, India, standing at 1,646 meters (5,400 feet) above sea level. Located in the Akole taluka of Ahmednagar district, it's part of the Kalsubai Harishchandragad Wildlife Sanctuary and offers breathtaking views of the Sahyadri mountain range.",
      image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
      hasVideo: false
    },
    {
      question: "How difficult is the trek?",
      icon: <Clock className="h-5 w-5" />,
      answer: "The Kalsubai trek is considered moderate in difficulty. The trail is about 6.6 km long and takes approximately 2-3 hours to reach the summit. The path includes rocky terrain, steep sections, and iron ladders near the peak. It's suitable for beginners with basic fitness levels, but proper preparation is recommended.",
      image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
      hasVideo: true,
      videoId: "dQw4w9WgXcQ" // Replace with actual video ID
    },
    {
      question: "What should I carry for camping?",
      icon: <Backpack className="h-5 w-5" />,
      answer: "Essential items include: comfortable trekking shoes, water bottles (2-3 liters), energy snacks, first aid kit, flashlight/headlamp, warm clothing for night, rain gear (during monsoon), sleeping bag, personal toiletries, and a camera to capture memories. We provide tents and basic camping equipment.",
      image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
      hasVideo: false
    },
    {
      question: "When is the best time to visit?",
      icon: <Calendar className="h-5 w-5" />,
      answer: "The best time to visit Kalsubai is during the monsoon season (June to September) when the landscape is lush green, and post-monsoon (October to February) for clear skies and pleasant weather. Avoid summer months (March to May) due to extreme heat. Each season offers a unique experience!",
      image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
      hasVideo: false
    },
    {
      question: "What's included in the ₹999 package?",
      icon: <DollarSign className="h-5 w-5" />,
      answer: "Our comprehensive package includes: accommodation at Hotel Kalsubai Gate Point, camping equipment (tents, sleeping bags), guided trek to the summit, all meals (dinner, breakfast, packed lunch), bonfire evening with music, first aid support, and transportation from the hotel to trek starting point. Group discounts available!",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      hasVideo: true,
      videoId: "dQw4w9WgXcQ" // Replace with actual video ID
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Magical Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-800/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full">
                    <Mountain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="text-white/70">Everything you need to know about Kalsubai</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Question */}
                    <motion.button
                      onClick={() => toggleItem(index)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full">
                          {item.icon}
                        </div>
                        <span className="text-white font-semibold">{item.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openItems.includes(index) ? (
                          <Minus className="h-5 w-5 text-white" />
                        ) : (
                          <Plus className="h-5 w-5 text-white" />
                        )}
                      </motion.div>
                    </motion.button>

                    {/* Answer */}
                    <AnimatePresence>
                      {openItems.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-4">
                            <p className="text-white/90 leading-relaxed">{item.answer}</p>
                            
                            {/* Image */}
                            {item.image && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-xl overflow-hidden shadow-lg"
                              >
                                <img
                                  src={item.image}
                                  alt={item.question}
                                  className="w-full h-48 object-cover"
                                />
                              </motion.div>
                            )}

                            {/* Video */}
                            {item.hasVideo && item.videoId && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-xl overflow-hidden shadow-lg"
                              >
                                <iframe
                                  width="100%"
                                  height="200"
                                  src={`https://www.youtube.com/embed/${item.videoId}`}
                                  title={item.question}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="rounded-xl"
                                ></iframe>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FAQModal;