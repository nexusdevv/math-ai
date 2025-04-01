'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from './components/AppLayout';
import BlurIn from './components/animations/BlurIn';

export default function Home() {
  const [problem, setProblem] = useState('');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('math-solver-history');
      if (savedHistory) {
        // Just loading to localStorage is sufficient
        JSON.parse(savedHistory);
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (problem.trim()) {
      router.push(`/solution?problem=${encodeURIComponent(problem)}`);
    }
  };

  const handleExampleClick = (example: string) => {
    setProblem(example);
  };

  return (
    <BlurIn>
      <AppLayout>
        <div className="container-custom py-12 sm:py-16">
          {/* API info box */}
          <div className="mb-10 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
              <span className="text-xl mr-2">🚀</span> 
              New: WolframAlpha API Integration!
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3 leading-relaxed">
              We now use the powerful computation engine of the world-renowned WolframAlpha to solve your math problems!
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1.5 pl-5 mb-2">
              <li className="flex items-center">
                <span className="mr-1.5 text-blue-500 dark:text-blue-300">✓</span>
                More accurate and detailed solutions
              </li>
              <li className="flex items-center">
                <span className="mr-1.5 text-blue-500 dark:text-blue-300">✓</span>
                Support for a wider range of problems
              </li>
              <li className="flex items-center">
                <span className="mr-1.5 text-blue-500 dark:text-blue-300">✓</span>
                Step-by-step detailed solution explanations
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-transparent dark:bg-transparent backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-1xl mx-auto">
            <div className="md:col-span-8">
              <h2 className="text-2xl font-bold mb-3 text-zinc-800 dark:text-zinc-100">Enter Your Problem</h2>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="problem" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Math Problem:
                  </label>
                  <textarea
                    id="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="math-input h-36 w-full transition-all bg-zinc-50 dark:bg-zinc-800/50 duration-200 focus:shadow-md"
                    placeholder="Ex: 2x + 3 = 7 or solve the system: x + y = 10, 2x - y = 5"
                  />
                </div>
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <p className="flex items-center border border-orange-200 dark:border-orange-200/2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tip: You can have chat with WolframAlpha too (ex: hello).
                  </p>
                </div>
                <div className="pt-3">
                  <button 
                    type="submit" 
                    className="btn-primary w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-all duration-300 hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></span>
                        Processing...
                      </span>
                    ) : "Solve"}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="md:col-span-4 border-t mt-6 pt-6 md:mt-0 md:pt-0 md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-8">
              <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Example Problems</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => handleExampleClick("2x + 3 = 7")}
                    className="text-left w-full py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    2x + 3 = 7
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("solve the system: x + y = 10, 2x - y = 5")}
                    className="text-left w-full py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    solve the system: x + y = 10, 2x - y = 5
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("find the x: 3x + 2 = 14")}
                    className="text-left w-full py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    find the x: 3x + 2 = 14
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("integrate x^2 + 3x + 2")}
                    className="text-left w-full py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    integrate x^2 + 3x + 2
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("differentiate sin(x) * cos(x)")}
                    className="text-left w-full py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    differentiate sin(x) * cos(x)
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AppLayout>
    </BlurIn>
  );
}
