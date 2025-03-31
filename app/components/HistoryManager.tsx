'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from './animations/FadeIn';

interface HistoryItem {
  problem: string;
  timestamp: number;
  id: string;
}

export default function HistoryManager() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // localStorage'dan geçmiş problemleri al
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('math-solver-history');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory) as HistoryItem[];
          setHistory(parsedHistory);
        }
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    };

    loadHistory();
  }, []);

  const addToHistory = (problem: string) => {
    if (!problem.trim()) return;
    
    try {
      const newItem: HistoryItem = {
        problem,
        timestamp: Date.now(),
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      
      const updatedHistory = [newItem, ...history].slice(0, 20); // Maks 20 öğe sakla
      setHistory(updatedHistory);
      localStorage.setItem('math-solver-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to add to history:', e);
    }
  };

  const removeFromHistory = (id: string) => {
    try {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem('math-solver-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to remove from history:', e);
    }
  };

  const clearHistory = () => {
    try {
      setHistory([]);
      localStorage.removeItem('math-solver-history');
    } catch (e) {
      console.error('Failed to clear history:', e);
    }
  };

  const loadProblem = (problem: string) => {
    router.push(`/solution?problem=${encodeURIComponent(problem)}`);
    setIsOpen(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        aria-label="View history"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 md:w-96 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-lg shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Problem History</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-4">
              No history yet. Solve some problems to see them here.
            </p>
          ) : (
            <>
              <div className="overflow-y-auto max-h-80">
                <ul className="space-y-2">
                  {history.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 border border-zinc-100 dark:border-zinc-900 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <button
                          onClick={() => loadProblem(item.problem)}
                          className="text-left hover:underline truncate w-5/6"
                          title={item.problem}
                        >
                          {item.problem}
                        </button>
                        <button
                          onClick={() => removeFromHistory(item.id)}
                          className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400"
                          title="Remove from history"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {formatDate(item.timestamp)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={clearHistory}
                  className="text-red-500 dark:text-red-400 text-sm hover:underline"
                >
                  Clear All History
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 