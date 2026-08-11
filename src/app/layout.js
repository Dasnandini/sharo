import "./globals.css";
import Link from 'next/link';
import { User } from 'lucide-react';
import Image from "next/image";
import logo from '@/assets/sharo-logo.png';

export const metadata = {
  title: "Sharo — Share files, simply.",
  description: "Upload your files or folders and get a secure link to share.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="radial-rings-bg min-h-screen flex flex-col justify-between text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
        {/* Navigation Header */}
        <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100/60">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center transition-transform group-hover:scale-105">
                <Image src={logo} alt="Sharo Logo" width={80} height={80} className="object-contain" priority />
              </div>
            </Link>

            {/* Right Navigation */}
            <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link href="/how-it-works" className="hover:text-orange-600 transition-colors">
                How it works
              </Link>
              <Link href="/about" className="hover:text-orange-600 transition-colors">
                About
              </Link>
              {/* <button 
                type="button" 
                className="px-4 py-2 rounded-xl border border-orange-200 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Sign in</span>
              </button> */}
            </nav>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-200/50">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Sharo — Share files, simply.</p>
            <p className="flex items-center gap-2">
              <span>Secure & Private</span>
              <span>•</span>
              <span>Auto Expiry</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
