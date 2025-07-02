import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
}

const AnimatedSectionWrapper: React.FC<AnimatedSectionWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stagger = false
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 100, x: 0 };
      case 'down':
        return { y: -100, x: 0 };
      case 'left':
        return { x: -100, y: 0 };
      case 'right':
        return { x: 100, y: 0 };
      default:
        return { y: 100, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: delay,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }
    }
  };

  return (
    <motion.div
      variants={stagger ? containerVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {stagger ? (
        React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedSectionWrapper;