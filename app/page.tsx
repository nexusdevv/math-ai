'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from './components/AppLayout';
import BlurIn from './components/animations/BlurIn';
import Link from 'next/link';

interface HistoryItem {
  id: string;
  problem: string;
  timestamp: number;
}

export default function Home() {
  const [problem, setProblem] = useState('');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('math-solver-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      router.push(`/solution?problem=${encodeURIComponent(problem)}`);
    }
  };

  const exampleProblems = [
    'x^2 + 4x - 5 = 0',
    'integrate x^2 + 3x + 2',
    'differentiate sin(x) * cos(x)',
    'solve the system: 2x + y = 5, x - y = 1',
    'find the determinant of [[1,2,3],[4,5,6],[7,8,9]]',
    'find the x: 2x = 10'
  ];

  const commandList = [
    { command: 'Solve Equation', example: 'x^2 + 4x - 5 = 0', description: 'Solves any equation' },
    { command: 'Find the x', example: 'find the x: 2x = 10', description: 'Finds the unknown x variable' },
    { command: 'Solve the System', example: 'solve the system: 2x + y = 5, x - y = 1', description: 'Solves systems of equations' },
    { command: 'Integrate', example: 'integrate x^2 + 3x + 2', description: 'Calculates integrals' },
    { command: 'Differentiate', example: 'differentiate sin(x) * cos(x)', description: 'Calculates derivatives' },
    { command: 'Determinant', example: 'find the determinant of [[1,2,3],[4,5,6],[7,8,9]]', description: 'Calculates matrix determinants' }
  ];

  const tryExample = (example: string) => {
    setProblem(example);
  };

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

  const clearHistory = () => {
    localStorage.removeItem('math-solver-history');
    setHistory([]);
  };

  return (
    <BlurIn>
      <AppLayout>
        <div className="container-custom py-8 sm:py-12">
          {/* API info box */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🚀 New: WolframAlpha API Integration!</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              We now use the powerful computation engine of the world-renowned WolframAlpha to solve your math problems!
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc pl-5 mb-2">
              <li>More accurate and detailed solutions</li>
              <li>Support for a wider range of problems</li>
              <li>Step-by-step detailed solution explanations</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-12 gap-6 bg-white dark:bg-black rounded-lg p-6 max-w-1xl mx-auto">
            <div className="col-span-8">
              <h2 className="text-xl font-semibold mb-4">Enter Your Problem</h2>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="problem" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Math Problem:
                  </label>
                  <textarea
                    id="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="math-input h-32 w-full"
                    placeholder="Ex: 2x + 3 = 7 or solve the system: x + y = 10, 2x - y = 5"
                  />
                </div>
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <p className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tip: You can have chat with WolframAlpha too (ex: hello).
                    </p>
                  </div>
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="btn-primary w-1/4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin h-5 mr-2 border-b-2 border-white rounded-full"></span>
                        Processing...
                      </span>
                    ) : "Solve"}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="col-span-4 border-l border-zinc-200 dark:border-zinc-800 pl-6">
              <h3 className="text-lg font-medium mb-2">Example Problems</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => handleExampleClick("2x + 3 = 7")}
                    className="text-left text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  >
                    2x + 3 = 7
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("solve the system: x + y = 10, 2x - y = 5")}
                    className="text-left text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  >
                    solve the system: x + y = 10, 2x - y = 5
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("find the x: 3x + 2 = 14")}
                    className="text-left text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  >
                    find the x: 3x + 2 = 14
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("integrate x^2 + 3x + 2")}
                    className="text-left text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  >
                    integrate x^2 + 3x + 2
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExampleClick("differentiate sin(x) * cos(x)")}
                    className="text-left text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
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
