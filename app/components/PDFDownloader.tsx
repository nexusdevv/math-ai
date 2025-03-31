'use client';

import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFDownloaderProps {
  contentRef: React.RefObject<HTMLElement>;
  problem: string;
  fileName?: string;
}

export default function PDFDownloader({ contentRef, problem, fileName = 'math-solution' }: PDFDownloaderProps) {
  const generatePDF = async () => {
    if (!contentRef.current) return;
    
    try {
      // We can add a loading message here
      const contentElement = contentRef.current;
      
      // Convert HTML content to canvas
      const canvas = await html2canvas(contentElement, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // PDF title
      pdf.setFontSize(16);
      pdf.text('MathAI', 105, 15, { align: 'center' });
      
      // Problem title
      pdf.setFontSize(12);
      pdf.text('Problem:', 20, 25);
      pdf.setFontSize(10);
      pdf.text(problem, 20, 32);
      
      pdf.text('Solution:', 20, 42);
      
      // Add canvas image
      const imgWidth = 170; // Width appropriate for A4 page
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 20, 45, imgWidth, imgHeight);
      
      // Footer
      const pageCount = pdf.getNumberOfPages();
      pdf.setFontSize(8);
      pdf.text(`Generated by MathGenius AI - Page ${pageCount}`, 105, 285, { align: 'center' });
      
      // Download PDF
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };
  
  return (
    <button 
      onClick={generatePDF}
      className="inline-flex items-center px-4 py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 mr-2"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" 
        />
      </svg>
      Save as PDF
    </button>
  );
} 