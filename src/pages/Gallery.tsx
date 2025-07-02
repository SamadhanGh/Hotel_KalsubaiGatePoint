import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mock gallery images - in production, these would come from your API
  const galleryImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      title: 'Hotel Exterior',
      category: 'Building'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      title: 'Comfortable Rooms',
      category: 'Rooms'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      title: 'Dining Area',
      category: 'Restaurant'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      title: 'Delicious Food',
      category: 'Food'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      title: 'Mountain Views',
      category: 'Views'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      title: 'Reception Area',
      category: 'Interior'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg',
      title: 'Garden Area',
      category: 'Outdoor'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg',
      title: 'Traditional Cuisine',
      category: 'Food'
    },
    {
      id: 9,
      url: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      title: 'Luxury Suites',
      category: 'Rooms'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Photo Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a visual tour of our hotel and discover what makes 
            Hotel Kalsubai Gate Point special.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryImages[selectedImage].url}
                  alt={galleryImages[selectedImage].title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image info */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{galleryImages[selectedImage].title}</h3>
                  <p className="text-gray-300">{galleryImages[selectedImage].category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Like What You See?
          </h2>
          <p className="text-gray-600 mb-6">
            Experience the beauty and comfort of Hotel Kalsubai Gate Point in person. 
            Book your stay today!
          </p>
          <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
            Book Now
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;