'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Popup'ın daha önce gösterilip gösterilmediğini kontrol et
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    // Popup'ı her zaman göster (localStorage kontrolünü kaldırdık)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };
  
  // Dışarı tıklandığında kapat
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button 
              onClick={closePopup}
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Welcome to MathAI</h2>
              
              <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <p>
                  <span className="font-semibold block mb-1">Hello user!</span>
                  This application was created by a single developer to help solve mathematical problems using advanced AI technologies so if you like it please give a star on github.
                </p>
                
                <p>
                  <span className="font-semibold block mb-1">About WolframAlpha Integration</span>
                  While we use the powerful WolframAlpha computational engine, please note that results may occasionally contain errors or limitations depending on the problem complexity.
                </p>
                
                <p>
                  For the best experience, try to format your mathematical queries clearly and check the results against your own calculations when possible.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 