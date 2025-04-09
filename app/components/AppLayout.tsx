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
    handleScroll(); // İlk yüklemede durumu kontrol et
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={`sticky shadow-lg shadow-zinc-200 dark:shadow-black top-0 w-full z-50 transition-all duration-300 ${
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
              <span className="ml-2 text-xs border border-blue-500 font-black text-blue-500 px-2 py-0.5 rounded-full font-medium">BETA</span>
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

      <main className="flex-1">
        {children}
      </main>

      <footer className="dark:border-zinc-900 py-6">
        <div className="container-custom flex justify-between items-center text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} MathAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/nexusdevv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/bbatuu.u" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
               </a>
           </div>
        </div>
      </footer>
    </div>
  );
} 