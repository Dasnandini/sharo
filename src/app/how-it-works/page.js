import Link from 'next/link';
import { 
  UploadCloud, 
  Share2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'How it works — Sharo',
  description: 'Learn how Sharo makes temporary file sharing simple, fast, and secure.',
};

export default function HowItWorksPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-6 sm:py-10 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple 3-Step Process</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How Sharo <span className="text-orange-600 font-black">Works.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto font-normal">
          Simple, fast, and auto-expiring temporary file sharing in seconds.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-8 border border-orange-100/60 card-shadow space-y-4 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 font-black text-xl flex items-center justify-center">
            01
          </div>
          <h3 className="text-xl font-bold text-slate-900">Upload File</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Drag & drop any file or folder up to 50MB. Choose your desired expiration timer: 1 Hour, 24 Hours, or 7 Days.
          </p>
          <div className="pt-2 text-orange-600 flex items-center gap-2 text-xs font-bold">
            <UploadCloud className="w-4 h-4" />
            <span>Instant Drag & Drop</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-8 border border-orange-100/60 card-shadow space-y-4 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 font-black text-xl flex items-center justify-center">
            02
          </div>
          <h3 className="text-xl font-bold text-slate-900">Get Private Link</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sharo uploads your file to cloud storage and generates a unique, cryptographically random shareable link.
          </p>
          <div className="pt-2 text-orange-600 flex items-center gap-2 text-xs font-bold">
            <Share2 className="w-4 h-4" />
            <span>Secure Link Token</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-8 border border-orange-100/60 card-shadow space-y-4 relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 font-black text-xl flex items-center justify-center">
            03
          </div>
          <h3 className="text-xl font-bold text-slate-900">Auto Expiry</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your recipient downloads the file. Once the expiration time elapses, the link expires and the file is deleted.
          </p>
          <div className="pt-2 text-orange-600 flex items-center gap-2 text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>Automatic Cleanup</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights Box */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-orange-100/60 card-shadow space-y-6">
        <h3 className="text-2xl font-black text-slate-900 text-center">
          Why Choose Sharo?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">No Accounts Required</h4>
              <p className="text-xs text-slate-500 mt-1">Start uploading immediately without registering or signing in.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex items-start gap-3.5">
            <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Live Download Counter</h4>
              <p className="text-xs text-slate-500 mt-1">Track how many times your recipient has downloaded your file.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base transition-all shadow-lg shadow-orange-600/25 hover:scale-105"
        >
          <span>Start Sharing Files Now</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
