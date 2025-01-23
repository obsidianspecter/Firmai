import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"
        animate={{
          background: [
            'linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))',
            'linear-gradient(to left, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg">
        {children}
      </div>
    </div>
  );
};