import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Drumstick, Plus, Edit, Trash2 } from 'lucide-react';

interface MenuCardProps {
  item: {
    id: number;
    name: string;
    price: number;
    category: 'veg' | 'nonveg' | 'extras';
    description: string;
    imageUrl?: string;
  };
  index: number;
  isAdmin?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, index, isAdmin, onEdit, onDelete }) => {
  const getCategoryIcon = () => {
    switch (item.category) {
      case 'veg':
        return <Leaf className="h-4 w-4 text-green-600" />;
      case 'nonveg':
        return <Drumstick className="h-4 w-4 text-red-600" />;
      default:
        return <Plus className="h-4 w-4 text-amber-600" />;
    }
  };

  const getCategoryColor = () => {
    switch (item.category) {
      case 'veg':
        return 'from-green-400 to-emerald-500';
      case 'nonveg':
        return 'from-red-400 to-rose-500';
      default:
        return 'from-amber-400 to-orange-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
      }}
      className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Magical Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor()} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sparkle Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
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
      </div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {item.imageUrl ? (
          <motion.img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor()} flex items-center justify-center`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-white text-6xl opacity-20"
            >
              {getCategoryIcon()}
            </motion.div>
          </div>
        )}
        
        {/* Category Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
        >
          {getCategoryIcon()}
        </motion.div>

        {/* Price Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold"
        >
          ₹{item.price}
        </motion.div>

        {/* Admin Controls */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute bottom-3 right-3 flex space-x-2"
          >
            <button
              onClick={() => onEdit?.(item)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete?.(item.id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300"
        >
          {item.name}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="text-gray-600 text-sm mb-4 line-clamp-2"
        >
          {item.description}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          className={`w-full bg-gradient-to-r ${getCategoryColor()} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
        >
          <span className="relative z-10">Add to Order</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuCard;