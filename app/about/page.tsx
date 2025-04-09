'use client';

import { useState } from 'react';
import Image from 'next/image';
import AppLayout from '../components/AppLayout';
import BlurIn from '../components/animations/BlurIn';

export default function AboutPage() {
  const [avatarUrl] = useState('/nexus.svg');
  
  return (
    <BlurIn>
    <AppLayout activeLink="about">
      <div className="container-custom py-12">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <Image 
                src={avatarUrl} 
                alt="Nexus Logo" 
                width={192} 
                height={192} 
                className="object-contain w-full h-full p-2 filter dark:invert"
                draggable={false}
                priority
              />
            </div>
            
            {/* Developer Info */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4 text-center md:text-left">Nexus</h2>
              <h3 className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 text-center md:text-left">Full Stack Developer</h3>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                <a 
                  href="https://github.com/nexusdevv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href={`https://instagram.com/bbatuu.u`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <p className="text-lg mb-6">
                Hello! I&apos;m a passionate full-stack developer with expertise in modern web technologies. 
                I built MathAI to help students and professionals solve complex 
                mathematical problems with detailed step-by-step solutions.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">About MathAI</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-6">
              MathAI is a comprehensive mathematical problem-solving platform designed to help students, teachers, and professionals work through complex math problems with detailed step-by-step solutions.
            </p>
            
            <h4 className="text-xl font-bold mt-6 mb-4">Features</h4>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Solve a wide range of mathematical problems instantly</li>
              <li>Get detailed step-by-step solutions to understand the process</li>
              <li>Support for algebra, calculus, geometry, and more</li>
              <li>Clean, minimalist interface focused on the math</li>
              <li>Works on mobile, tablet, and desktop devices</li>
            </ul>
            
            <h4 className="text-xl font-bold mt-6 mb-4">Technologies Used</h4>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Next.js for the frontend framework</li>
              <li>Tailwind CSS for styling</li>
              <li>MathJS for mathematical computation</li>
              <li>KaTeX for mathematical notation rendering</li>
              <li>WolframAlpha API for advanced calculations</li>
            </ul>
          </div>
        </section>
      </div>
    </AppLayout>
    </BlurIn>
  );
} 