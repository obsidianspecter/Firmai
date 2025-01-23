import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedBorder } from './AnimatedBorder';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  withBorder = true
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.div>
  );

  return withBorder ? (
    <AnimatedBorder className="my-4">{content}</AnimatedBorder>
  ) : content;
};