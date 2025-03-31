'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import AppLayout from '../components/AppLayout';
import PDFDownloader from '../components/PDFDownloader';
import BlurIn from '../components/animations/BlurIn';

// API Status Notification Component
const ApiNotification = ({ status, message }: { status: 'loading' | 'success' | 'error' | 'idle', message: string }) => {
  if (status === 'idle') return null;
  
  const bgColor = 
    status === 'loading' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' :
    status === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' :
    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-300';
    
  return (
    <div className={`p-3 rounded-lg border mb-4 text-sm ${bgColor} flex items-center`}>
      {status === 'loading' && (
        <div className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      )}
      {status === 'success' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {status === 'error' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <div>
        <div className="font-medium">{
          status === 'loading' ? 'Processing...' :
          status === 'success' ? 'Successfully Completed!' :
          'Warning'
        }</div>
        <div>{message}</div>
        {status === 'error' && (
          <div className="mt-1 text-xs">
            Unable to calculate with WolframAlpha API. Please check your connection or try a different problem format.
          </div>
        )}
      </div>
    </div>
  );
};

export default function SolutionPage() {
  const searchParams = useSearchParams();
  const problem = searchParams.get('problem') || '';
  
  const [solution, setSolution] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const [apiMessage, setApiMessage] = useState('');
  const solutionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!problem) {
      setError('No problem provided');
      setIsLoading(false);
      return;
    }

    try {
      solveProblem(problem);
      addToHistory(problem);
    } catch (err) {
      setError('Failed to solve the problem. Please check your input and try again.');
      console.error(err);
    }
  }, [problem]);

  const addToHistory = (problem: string) => {
    if (!problem.trim()) return;
    
    try {
      const savedHistory = localStorage.getItem('math-solver-history');
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      
      const isDuplicate = history.some((item: any) => item.problem === problem);
      if (isDuplicate) return;
      
      const newItem = {
        problem,
        timestamp: Date.now(),
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      
      const updatedHistory = [newItem, ...history].slice(0, 20);
      localStorage.setItem('math-solver-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to add to history:', e);
    }
  };

  const prepareWolframQuery = (problem: string) => {
    let query = problem;
    
    // Adapt query based on problem type
    if (problem.toLowerCase().includes('solve the system')) {
      query = problem.replace('solve the system:', 'solve system of equations').trim();
    } else if (problem.toLowerCase().includes('find the x')) {
      query = problem.replace('find the x:', 'solve for x').trim();
    } else if (problem.toLowerCase().includes('integrate')) {
      query = problem.replace('integrate', 'integrate').trim();
    } else if (problem.toLowerCase().includes('differentiate')) {
      query = problem.replace('differentiate', 'derivative of').trim();
    } else if (problem.toLowerCase().includes('determinant')) {
      const matrixStr = problem.match(/\[\[.*\]\]/)?.[0] || '';
      if (matrixStr) {
        query = `determinant of ${matrixStr}`;
      }
    }
    
    return query;
  };

  const solveProblem = async (problem: string) => {
    setIsLoading(true);
    setSolution([]);
    setApiStatus('loading');
    setApiMessage('Connecting to WolframAlpha API...');

    try {
      // Prepare query for Wolfram Alpha
      const query = prepareWolframQuery(problem);
      
      // Call our API endpoint that connects to WolframAlpha
      const response = await axios.get(`/api/wolfram?query=${encodeURIComponent(query)}`);
      
      if (response.data.success) {
        setSolution(response.data.steps);
        setApiStatus('success');
        setApiMessage('Calculations completed successfully with WolframAlpha API');
      } else {
        setApiStatus('error');
        setApiMessage('The API could not solve this problem');
        setSolution(response.data.steps || ['Unable to solve this problem with the current API.']);
      }
    } catch (err) {
      console.error('API connection error:', err);
      setApiStatus('error');
      setApiMessage('Failed to connect to WolframAlpha API');
      setError('Failed to calculate the solution. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
      
      // Clear notification after 8 seconds
      setTimeout(() => {
        setApiStatus('idle');
      }, 8000);
    }
  };

  const renderWithKatex = (text: string) => {
    try {
      let processedText = text;
      
      // Replace basic math notation with LaTeX
      processedText = processedText.replace(/\^(\d+)/g, '^{$1}');
      processedText = processedText.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
      processedText = processedText.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
      
      return katex.renderToString(processedText, {
        throwOnError: false,
        displayMode: false
      });
    } catch (e) {
      return text;
    }
  };

  // Determine if a step is a main step header
  const isMainStep = (step: string) => {
    return step.includes('Step') || 
           step.includes('Result:') || 
           step.includes('Solution:') ||
           step.includes('Problem:');
  };

  return (
    <BlurIn>
    <AppLayout>
      <div className="container-custom py-12">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Problem</h2>
          <div className="p-4 bg-zinc-100 dark:bg-black rounded-lg">
            <div 
              className="font-sans leading-relaxed tracking-normal text-lg"
              dangerouslySetInnerHTML={{ __html: renderWithKatex(problem) }} 
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Solution</h2>
          
          <ApiNotification status={apiStatus} message={apiMessage} />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-100 mb-4"></div>
              <p className="text-zinc-600 dark:text-zinc-400">Calculating with WolframAlpha...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 text-center">
              <p className="text-lg mb-2">Error</p>
              <p>{error}</p>
              <Link 
                href="/" 
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Another Problem
              </Link>
            </div>
          ) : (
            <div ref={solutionContentRef} className="space-y-2">
              {solution.length === 0 ? (
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg text-yellow-800 dark:text-yellow-400 text-center">
                  <p>No solution found for this problem. Please try rephrasing or using a different format.</p>
                </div>
              ) : (
                solution.map((step, index) => (
                  <div 
                    key={index} 
                    className={`p-4 ${
                      isMainStep(step) 
                        ? 'bg-zinc-100 dark:bg-zinc-800 border-l-4 border-blue-500 dark:border-blue-400' 
                        : 'bg-white dark:bg-zinc-900'
                    } border border-zinc-200 dark:border-zinc-800 rounded-lg mb-2`}
                  >
                    <div 
                      className={`font-sans leading-relaxed tracking-normal ${
                        isMainStep(step) 
                          ? 'font-semibold text-lg' 
                          : 'font-normal text-base'
                      }`}
                      dangerouslySetInnerHTML={{ __html: renderWithKatex(step) }} 
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/" 
            className="btn-primary inline-block"
          >
            Solve Another Problem
          </Link>
          
          {!isLoading && !error && solution.length > 0 && (
            <PDFDownloader 
              contentRef={solutionContentRef as React.RefObject<HTMLElement>} 
              problem={problem}
              fileName={`math-solution-${new Date().getTime()}`}
            />
          )}
        </div>
      </div>
    </AppLayout>
    </BlurIn>
  );
} 