import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Clock, 
  Mountain, 
  Tent, 
  Flame, 
  Utensils, 
  CheckCircle,
  Camera,
  Backpack,
  Thermometer,
  Flashlight,
  Shield
} from 'lucide-react';

interface CampingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampingInfoModal: React.FC<CampingInfoModalProps> = ({ isOpen, onClose }) => {
  const trekRoute = [
    { step: "Hotel Kalsubai Gate Point", icon: <MapPin className="h-4 w-4" />, time: "Start" },
    { step: "Base Village", icon: <Mountain className="h-4 w-4" />, time: "15 mins" },
    { step: "First Checkpoint", icon: <CheckCircle className="h-4 w-4" />, time: "45 mins" },
    { step: "Iron Ladders", icon: <Mountain className="h-4 w-4" />, time: "1.5 hrs" },
    { step: "Kalsubai Peak", icon: <Mountain className="h-4 w-4" />, time: "2-3 hrs" }
  ];

  const campingSchedule = [
    { time: "4:00 PM", activity: "Check-in & Welcome", icon: <CheckCircle className="h-4 w-4" /> },
    { time: "5:00 PM", activity: "Trek Briefing", icon: <Mountain className="h-4 w-4" /> },
    { time: "6:00 PM", activity: "Evening Snacks", icon: <Utensils className="h-4 w-4" /> },
    { time: "7:30 PM", activity: "Bonfire & Music", icon: <Flame className="h-4 w-4" /> },
    { time: "9:00 PM", activity: "Dinner", icon: <Utensils className="h-4 w-4" /> },
    { time: "5:00 AM", activity: "Wake up & Tea", icon: <Clock className="h-4 w-4" /> },
    { time: "6:00 AM", activity: "Trek Starts", icon: <Mountain className="h-4 w-4" /> },
    { time: "12:00 PM", activity: "Packed Lunch", icon: <Utensils className="h-4 w-4" /> }
  ];

  const packingList = [
    { category: "Clothing", items: ["Comfortable trekking shoes", "Warm jacket", "Rain gear", "Extra clothes"], icon: <Thermometer className="h-5 w-5" /> },
    { category: "Essentials", items: ["Water bottles (2-3L)", "Energy snacks", "Personal medicines", "Toiletries"], icon: <Backpack className="h-5 w-5" /> },
    { category: "Equipment", items: ["Flashlight/Headlamp", "Power bank", "Camera", "Sunglasses"], icon: <Flashlight className="h-5 w-5" /> },
    { category: "Safety", items: ["First aid kit", "Emergency contacts", "ID proof", "Insurance"], icon: <Shield className="h-5 w-5" /> }
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
    "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
    "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
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
            className="relative w-full max-w-6xl max-h-[90vh] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Magical Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-800/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_70%)]" />

            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full">
                    <Tent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Trekking & Camping Info</h2>
                    <p className="text-white/70">Complete guide to your Kalsubai adventure</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column */}
                <div className="space-y-6">
                  
                  {/* Trek Info */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Mountain className="h-5 w-5 text-orange-400" />
                      <span>Trek Details</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400">6.6 KM</div>
                        <div className="text-white/70 text-sm">Distance</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400">Medium</div>
                        <div className="text-white/70 text-sm">Difficulty</div>
                      </div>
                    </div>
                    
                    {/* Trek Route */}
                    <h4 className="text-lg font-semibold text-white mb-3">Trek Route</h4>
                    <div className="space-y-2">
                      {trekRoute.map((point, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <div className="text-orange-400">{point.icon}</div>
                          <div className="flex-1 text-white">{point.step}</div>
                          <div className="text-white/70 text-sm">{point.time}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Camping Schedule */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-400" />
                      <span>Camping Schedule</span>
                    </h3>
                    <div className="space-y-2">
                      {campingSchedule.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          <div className="text-orange-400">{item.icon}</div>
                          <div className="text-orange-400 font-mono text-sm w-16">{item.time}</div>
                          <div className="text-white">{item.activity}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  
                  {/* What to Carry */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Backpack className="h-5 w-5 text-orange-400" />
                      <span>What to Carry</span>
                    </h3>
                    <div className="space-y-4">
                      {packingList.map((category, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/5 rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="text-orange-400">{category.icon}</div>
                            <h4 className="font-semibold text-white">{category.category}</h4>
                          </div>
                          <ul className="space-y-1">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-white/80 text-sm flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-400" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Gallery */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Camera className="h-5 w-5 text-orange-400" />
                      <span>Gallery</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {galleryImages.map((image, index) => (
                        <motion.div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Video */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Experience Video</h3>
                    <div className="rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Kalsubai Trek Experience"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-xl"
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampingInfoModal;