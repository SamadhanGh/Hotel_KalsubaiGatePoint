import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const SocialMediaIcons = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: 'https://facebook.com/hotelkalsubai',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      url: 'https://instagram.com/hotelkalsubai',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:shadow-pink-500/25'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://linkedin.com/company/hotelkalsubai',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: 'https://twitter.com/hotelkalsubai',
      color: 'from-sky-400 to-sky-500',
      hoverColor: 'hover:shadow-sky-500/25'
    },
   
  ];

  return (
    <div className="fixed top-20 right-6 z-40">
      <motion.div
        className="flex flex-col space-y-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, staggerChildren: 0.1 }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-3 bg-gradient-to-br ${social.color} text-white rounded-full shadow-lg hover:shadow-xl ${social.hoverColor} transition-all duration-300`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {social.icon}
            </motion.div>

            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              {social.name}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/80"></div>
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2 }}
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialMediaIcons;