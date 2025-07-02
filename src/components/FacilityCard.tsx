import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FacilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
  gradient: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  index,
  gradient 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -15,
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Magical Background Glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Icon Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
        className="relative mb-6"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-shadow duration-500`}
        >
          <Icon className="h-10 w-10 text-white" />
        </motion.div>
        
        {/* Glow Ring */}
        <motion.div
          className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl mx-auto opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
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

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="text-center relative z-10"
      >
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-white/80 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.7 + idx * 0.1 }}
              className="flex items-center justify-center text-sm text-white/90"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-white/60 rounded-full mr-3"
              />
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default FacilityCard;