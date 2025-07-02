import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Drumstick, Plus, Search, Filter } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import AnimatedSectionWrapper from '../components/AnimatedSectionWrapper';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const menuData = {
    veg: [
      { 
        id: 1,
        name: 'Paneer Butter Masala', 
        price: 180, 
        category: 'veg' as const,
        description: 'Rich and creamy paneer curry with aromatic spices and fresh herbs',
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
      },
      { 
        id: 2,
        name: 'Dal Tadka', 
        price: 120, 
        category: 'veg' as const,
        description: 'Yellow lentils tempered with cumin, garlic, and fresh coriander',
        imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
      },
      { 
        id: 3,
        name: 'Veg Biryani', 
        price: 160, 
        category: 'veg' as const,
        description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
      },
      { 
        id: 4,
        name: 'Aloo Gobi', 
        price: 140, 
        category: 'veg' as const,
        description: 'Traditional potato and cauliflower curry with turmeric and spices',
        imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
      },
      { 
        id: 5,
        name: 'Palak Paneer', 
        price: 170, 
        category: 'veg' as const,
        description: 'Fresh spinach curry with cottage cheese cubes and cream',
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
      },
      { 
        id: 6,
        name: 'Chole Bhature', 
        price: 150, 
        category: 'veg' as const,
        description: 'Spicy chickpeas curry served with fluffy fried bread',
        imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
      },
    ],
    nonveg: [
      { 
        id: 7,
        name: 'Chicken Biryani', 
        price: 220, 
        category: 'nonveg' as const,
        description: 'Aromatic basmati rice with tender chicken pieces and exotic spices',
        imageUrl: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg'
      },
      { 
        id: 8,
        name: 'Butter Chicken', 
        price: 250, 
        category: 'nonveg' as const,
        description: 'Creamy tomato-based chicken curry with rich butter and cream',
        imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
      },
      { 
        id: 9,
        name: 'Mutton Curry', 
        price: 280, 
        category: 'nonveg' as const,
        description: 'Tender goat meat cooked in traditional spices and onion gravy',
        imageUrl: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg'
      },
      { 
        id: 10,
        name: 'Fish Fry', 
        price: 200, 
        category: 'nonveg' as const,
        description: 'Crispy fried fish marinated with coastal spices and herbs',
        imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
      },
      { 
        id: 11,
        name: 'Chicken Tikka', 
        price: 180, 
        category: 'nonveg' as const,
        description: 'Grilled chicken pieces marinated in yogurt and tandoori spices',
        imageUrl: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg'
      },
      { 
        id: 12,
        name: 'Prawn Curry', 
        price: 260, 
        category: 'nonveg' as const,
        description: 'Fresh prawns cooked in coconut curry with curry leaves',
        imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
      },
    ],
    extras: [
      { 
        id: 13,
        name: 'Butter Naan', 
        price: 25, 
        category: 'extras' as const,
        description: 'Soft leavened flatbread brushed with butter and garlic',
        imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'
      },
      { 
        id: 14,
        name: 'Jeera Rice', 
        price: 80, 
        category: 'extras' as const,
        description: 'Fragrant basmati rice tempered with cumin seeds',
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
      },
      { 
        id: 15,
        name: 'Gulab Jamun', 
        price: 60, 
        category: 'extras' as const,
        description: 'Sweet milk dumplings soaked in rose-flavored sugar syrup',
        imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'
      },
      { 
        id: 16,
        name: 'Kulfi Ice Cream', 
        price: 50, 
        category: 'extras' as const,
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg'
      },
    ]
  };

  const allItems = [...menuData.veg, ...menuData.nonveg, ...menuData.extras];

  const categories = [
    { id: 'all', name: 'All Items', icon: <Filter className="h-5 w-5" />, color: 'purple' },
    { id: 'veg', name: 'Vegetarian', icon: <Leaf className="h-5 w-5" />, color: 'green' },
    { id: 'nonveg', name: 'Non-Vegetarian', icon: <Drumstick className="h-5 w-5" />, color: 'red' },
    { id: 'extras', name: 'Extras & Desserts', icon: <Plus className="h-5 w-5" />, color: 'amber' },
  ];

  useEffect(() => {
    let items = activeCategory === 'all' ? allItems : menuData[activeCategory as keyof typeof menuData] || [];
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredItems(items);
  }, [activeCategory, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden"
    >
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSectionWrapper direction="down" className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Our Magical Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our enchanting selection of authentic Indian cuisine, 
            crafted with love and the finest ingredients from the mountains.
          </motion.p>
        </AnimatedSectionWrapper>

        {/* Search Bar */}
        <AnimatedSectionWrapper direction="up" delay={0.2} className="mb-8">
          <div className="max-w-md mx-auto relative">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search delicious dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-lg transition-all duration-300"
              />
            </motion.div>
          </div>
        </AnimatedSectionWrapper>

        {/* Category Tabs */}
        <AnimatedSectionWrapper direction="up" delay={0.4} className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 relative overflow-hidden ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r from-${category.color}-400 to-${category.color}-500 text-white shadow-lg`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSectionWrapper>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchTerm}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Search className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No dishes found</h3>
            <p className="text-gray-600">Try adjusting your search or browse different categories</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <AnimatedSectionWrapper direction="up" delay={0.6} className="mt-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-6"
              >
                Ready to Taste the Magic?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8 text-amber-100"
              >
                Contact us to place your order or visit our restaurant for an unforgettable dining experience.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
                >
                  WhatsApp Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Call Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatedSectionWrapper>
      </div>
    </motion.div>
  );
};

export default Menu;