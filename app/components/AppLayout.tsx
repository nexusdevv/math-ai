'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import HistoryManager from './HistoryManager';

interface AppLayoutProps {
  children: React.ReactNode;
  activeLink?: 'home' | 'about';
}

export default function AppLayout({ children, activeLink = 'home' }: AppLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 dark:border-zinc-900/50' 
            : 'bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900'
        }`}
      >
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <Link href="/" className="flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,500) scale(0.1,-0.1)" fill="currentColor" stroke="none">
                  <path d="M2926 4012 c-21 -70 -66 -212 -99 -317 -33 -104 -71 -228 -84 -275 -14 -47 -49 -159 -78 -250 -30 -91 -72 -226 -93 -300 -22 -74 -63 -207 -92 -295 -29 -88 -57 -178 -62 -200 -8 -35 -29 -101 -134 -424 -13 -40 -24 -78 -24 -84 0 -6 -33 -114 -73 -241 -74 -230 -175 -555 -184 -588 -5 -17 6 -18 133 -18 l139 0 49 153 c26 83 60 190 73 237 14 47 59 189 99 315 41 127 74 236 74 242 0 6 36 122 80 259 44 136 80 251 80 257 0 5 36 120 79 256 44 135 81 257 84 271 3 14 37 126 77 250 39 124 75 239 80 255 5 17 40 129 78 250 83 265 112 359 112 368 0 4 -62 7 -137 7 l-138 0 -39 -128z"/>
                  <path d="M1950 3915 c-28 -16 -148 -71 -225 -103 -27 -11 -111 -48 -185 -82 -399 -183 -458 -210 -466 -210 -4 0 -54 -21 -111 -47 l-102 -48 -1 -86 0 -86 47 -20 c27 -12 118 -53 203 -91 85 -39 178 -80 205 -92 62 -26 307 -137 518 -235 l157 -74 0 112 0 112 -42 19 c-24 10 -86 37 -138 58 -52 22 -133 56 -180 78 -173 78 -201 90 -210 90 -5 0 -48 18 -97 41 -48 23 -105 48 -125 56 -46 18 -51 47 -10 61 15 5 99 41 187 79 88 38 196 85 240 103 44 19 116 50 160 70 44 20 96 42 115 50 19 7 50 19 68 27 l32 14 0 109 c0 61 -3 110 -7 110 -5 0 -19 -7 -33 -15z"/>
                  <path d="M3455 1881 c-80 -22 -181 -86 -217 -136 -111 -153 -127 -411 -36 -588 65 -128 215 -207 394 -207 195 0 342 94 409 261 27 68 29 84 30 204 0 139 -6 168 -57 273 -80 165 -316 253 -523 193z m232 -202 c52 -25 89 -67 103 -117 19 -65 24 -168 10 -231 -27 -129 -92 -186 -210 -186 -145 1 -212 87 -212 276 0 91 23 178 55 213 59 66 170 86 254 45z"/>
                </g>
              </svg>
              MathAI
            </Link>
          </h1>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/" 
                    className={`hover:underline ${activeLink === 'home' ? 'font-medium' : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className={`hover:underline ${activeLink === 'about' ? 'font-medium' : ''}`}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-2">
              <HistoryManager />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-6">
        <div className="container-custom text-center text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} MathAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 