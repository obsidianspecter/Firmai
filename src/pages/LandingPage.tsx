import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Brain,
  Award,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle,
  Play,
  MessageSquare,
  HelpCircle,
  Quote,
} from 'lucide-react';

// ----- Data (move these to separate files if desired) -----
const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Expert-Led Courses',
    description:
      'Learn from top legal professionals and industry experts through comprehensive, structured courses.',
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI-Powered Learning',
    description:
      'Get instant assistance and personalized learning recommendations from our advanced AI system.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaborative Learning',
    description:
      'Join study groups and participate in discussions with peers from around the world.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Real-World Cases',
    description:
      'Practice with authentic legal scenarios and develop practical skills for your career.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Interactive Tools',
    description:
      'Access modern learning tools including quizzes, flashcards, and case simulations.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Certifications',
    description:
      'Earn recognized certificates to showcase your expertise and advance your career.',
  },
];

const stats = [
  { number: '50K+', label: 'Active Learners' },
  { number: '200+', label: 'Expert Instructors' },
  { number: '1000+', label: 'Course Hours' },
  { number: '95%', label: 'Success Rate' },
];

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Law Graduate',
    quote:
      'This platform transformed my career. The interactive cases made studying so much more engaging!',
    avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    name: 'John Smith',
    role: 'Corporate Attorney',
    quote:
      'I loved the AI-powered features. Getting instant feedback saved me a lot of time.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const faqs = [
  {
    question: 'How long do I have access to the courses?',
    answer:
      'Once you enroll in a course, you have lifetime access to it, including all updates and additional materials.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a 30-day money-back guarantee. If you’re not satisfied, we’ll refund your purchase—no questions asked.',
  },
];

// ----- Reusable Sub-components -----

/** SectionWrapper: Utility wrapper for consistent section styling **/
const SectionWrapper = ({ children, className = '', ...props }) => {
  return (
    <section
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

/** StatItem: Displays an individual statistic with number and label **/
const StatItem = ({ number, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

/** FeatureCard: Displays a feature with icon, title, description **/
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, {
          className: 'h-7 w-7 text-indigo-600 dark:text-indigo-400',
        })}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

/** TestimonialCard: Displays a testimonial with quote and avatar **/
const TestimonialCard = ({ name, role, quote, avatar }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between h-full">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Quote className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mb-2" />
        <p className="text-gray-700 dark:text-gray-200">{quote}</p>
      </div>
    </div>
  );
};

/** FAQItem: Displays a single FAQ with expandable answer **/
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {question}
          </span>
        </div>
        <span
          className={`transition-transform ${
            open ? 'rotate-180' : ''
          } text-indigo-600 dark:text-indigo-400`}
        >
          ▼
        </span>
      </button>
      {open && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p>
      )}
    </div>
  );
};

// ----- Main Component -----

export const LandingPage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center"
        aria-label="Hero Section"
      >
        {/* Background gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-primary-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-900 -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"
          role="img"
          aria-label="Legal books and documents background"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                <Sparkles className="h-4 w-4 mr-2" />
                The Future of Legal Education
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight animate-fade-in-up delay-100">
              Transform Your{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                Legal Career
              </span>
              <br />
              with AI-Powered Learning
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Master legal concepts, practice with real-world cases, and connect
              with experts through our innovative learning platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
              <Link
                to="/register"
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
              >
                Watch Demo
                <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <SectionWrapper className="bg-white dark:bg-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </SectionWrapper>

      {/* Features Section */}
      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our platform combines cutting-edge technology with expert legal
            knowledge
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            What Our Learners Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
            Hear it from those who’ve experienced our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
            Have questions? We’ve got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900 transform skew-y-3 -z-10"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              'Access to all courses and materials',
              'Personal AI learning assistant',
              'Certificate upon completion',
              '30-day money-back guarantee',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-indigo-100"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-indigo-600 bg-white rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
