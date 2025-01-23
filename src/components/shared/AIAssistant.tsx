import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Send } from 'lucide-react';
import { AnimatedBorder } from './AnimatedBorder';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thanks for your message! I'm here to help with any questions about our courses or platform.",
        isBot: true
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-indigo-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] z-50"
          >
            <AnimatedBorder>
              <div className="overflow-hidden rounded-lg">
                <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-6 h-6" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-indigo-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </AnimatedBorder>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};