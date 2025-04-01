'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Show popup with a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };
  
  // Close when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-0 relative border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6 md:w-1/2">
              <button 
                onClick={closePopup}
                className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
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
                <div className="flex items-center justify-center md:justify-start">
                  <h2 className="text-2xl font-bold mb-1 text-center md:text-left bg-black dark:bg-white bg-clip-text text-transparent">Welcome to MathAI</h2>
                  <span className="ml-3 text-xs border border-blue-500 font-black text-blue-500 px-2 py-0.5 rounded-full font-medium">BETA</span>
                </div>
                <div className='bg-zinc-100 dark:bg-zinc-800 h-px my-4 rounded-full w-full'></div>
                <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                  <p className="bg-white dark:bg-zinc-900/90 p-3 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-500/10 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <span className="font-semibold block mb-1">Hello user! 👋</span>
                    This application was created by a single developer to help solve mathematical problems using advanced AI technologies. If you find it useful, please consider giving it a star on GitHub.
                  </p>
                  
                  <p className="bg-white dark:bg-zinc-900/90 p-3 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-500/10 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <span className="font-semibold block mb-1">About WolframAlpha Integration ⚙️</span>
                    While we use the powerful WolframAlpha computational engine, please note that results may occasionally contain errors or limitations depending on the problem complexity.
                  </p>
                  
                  <p className="bg-white dark:bg-zinc-900/90 p-3 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-500/10 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    For the best experience, try to format your mathematical queries clearly and check the results against your own calculations when possible.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="hidden md:block w-px bg-zinc-200 dark:bg-zinc-800 self-stretch"></div>
            
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-7xl font-bold mb-4 text-black dark:text-zinc-100 font-sans tracking-tight">MathAI <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">1.5</span></h3>
                <p className="text-sm underline text-zinc-600 dark:text-zinc-400 mb-6">MathAI 2.0 coming soon with big improvements!</p>
                <ul className="border-t border-gradient-to-r from-blue-500 to-purple-600 px-4 py-4 dark:border-zinc-700 space-y-5">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>New user interface and faster performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Optimized design for mobile devices</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="flex flex-col items-center gap-4 justify-center">
                    <a 
                      href="https://github.com/nexusdevv" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-zinc-100 border border-zinc-300 dark:border-zinc-900 dark:bg-zinc-800 p-3 rounded-full w-full text-center flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://instagram.com/batuhan13485" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-zinc-100 border border-zinc-300 dark:border-zinc-900 dark:bg-zinc-800 p-3 rounded-full w-full text-center flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      aria-label="Instagram Profile"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="flex items-center justify-center py-5 text-sm text-zinc-500 dark:text-zinc-400">
                    2025 © MathAI by
                    <a href="https://github.com/nexusdevv" target="_blank" rel="noopener noreferrer" className="underline text-blue-500 px-1 dark:text-blue-400 hover:underline">
                      Nexus
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}