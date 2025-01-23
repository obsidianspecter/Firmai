import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Legal Tech',
      progress: 75,
      nextLesson: 'AI in Legal Research',
      timeLeft: '2h 30m',
    },
    {
      id: 2,
      title: 'Contract Law Fundamentals',
      progress: 45,
      nextLesson: 'Breach of Contract',
      timeLeft: '4h 15m',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome back!
          </h1>

          {/* Progress Overview */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Progress
            </h2>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-5">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-3 bg-indigo-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span>Next: {course.nextLesson}</span>
                    <span>{course.timeLeft} left</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  24.5
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Hours
                </span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  3
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Certifications
                </span>
              </div>
            </motion.div>
          </div>

          {/* Recommended Courses */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Recommended Courses
            </h2>
            <div className="space-y-6">
              <Link
                to="/courses/legal-tech-essentials"
                className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Legal Tech Essentials
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Master the basics of legal technology.
                </p>
              </Link>
              <Link
                to="/courses/ai-law"
                className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  AI in Law
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore AI applications in legal practice.
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
