import { motion } from 'framer-motion';
import { Play, Book, FileText, Video, Download } from 'lucide-react';
import { ResponsiveContainer } from '../components/shared/ResponsiveContainer';
import { AnimatedBorder } from '../components/shared/AnimatedBorder';

// ----- Sample Data ----- //
const resources = [
  {
    title: 'Interactive Course Demo',
    description:
      'Experience our engaging learning platform with a sample course module.',
    icon: <Book className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    preview:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Case Study Library',
    description:
      'Browse through our collection of real-world legal case studies.',
    icon: <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    preview:
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Video Lectures',
    description:
      'Sample our high-quality video lectures from top legal experts.',
    icon: <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    preview:
      'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Resource Materials',
    description: 'Access sample study materials and legal document templates.',
    icon: <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    preview:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
  },
];

// ----- Framer Motion Variants ----- //
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ----- Reusable Sub-Components ----- //

/**
 * DemoHeader: Displays the main heading & subheading text with a Framer Motion fade-in animation
 */
const DemoHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center mb-20"
    >
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
        Experience FirmAI in Action
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
        Explore our comprehensive learning resources and tools designed to boost
        your legal expertise.
      </p>
    </motion.div>
  );
};

/**
 * ResourceCard: Single resource card with an image, icon, title, description, and CTAs
 */
const ResourceCard = ({ title, description, icon, preview, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay: index * 0.2 }}
      aria-label={`Resource: ${title}`}
    >
      <AnimatedBorder>
        <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image with overlay button */}
          <div className="relative group">
            <img
              src={preview}
              alt={`Preview for ${title}`}
              className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Overlay play button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-indigo-600 p-4 rounded-full shadow-lg"
                aria-label={`Play demo video for ${title}`}
              >
                <Play className="w-8 h-8" />
              </motion.button>
            </div>
          </div>

          {/* Card content */}
          <div className="p-6 bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-4 mb-5">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              aria-label={`Try demo for ${title}`}
            >
              Try Demo
            </motion.button>
          </div>
        </div>
      </AnimatedBorder>
    </motion.div>
  );
};

// ----- Main Component ----- //

export const Demo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <ResponsiveContainer>
        {/* Header */}
        <DemoHeader />

        {/* Resource Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              index={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              preview={resource.preview}
            />
          ))}
        </motion.div>
      </ResponsiveContainer>
    </div>
  );
};
