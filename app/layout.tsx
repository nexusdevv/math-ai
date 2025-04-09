import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import WelcomePopup from "./components/WelcomePopup";
import PopadsScript from "./components/PopadsScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MathAI | Smart Math Problem Solver",
  description: "Solve any math problem instantly with AI-powered step-by-step explanations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PopadsScript />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <WelcomePopup />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
