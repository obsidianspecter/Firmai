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
  const [loading, setLoading] = useState(false);

  // API base URL from environment variable with a fallback
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: input }),
      });

      if (!response.body) throw new Error('No response body received');

      // Streaming response logic
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botReply = "";

      setMessages((prev) => [...prev, { text: "", isBot: true }]); // Empty message placeholder for streaming

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const jsonChunks = chunk.trim().split("\n");

        for (const jsonChunk of jsonChunks) {
          try {
            const parsedData = JSON.parse(jsonChunk);
            botReply += parsedData.text;
            setMessages((prev) => {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1].text = botReply;
              return updatedMessages;
            });
          } catch (err) {
            console.error("Error parsing chunk", err);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { text: 'Oops! Something went wrong. Try again later.', isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-indigo-400"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-indigo-700 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
                  {messages.map((message, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${message.isBot ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'bg-indigo-600 text-white'}`}>
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                  {loading && <div className="text-center text-gray-500">Typing...</div>}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..."
                    disabled={loading} className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" disabled={loading}>
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              </div>
            </AnimatedBorder>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
