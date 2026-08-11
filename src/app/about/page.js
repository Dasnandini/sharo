import Link from 'next/link';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ArrowRight,
  Code2
} from 'lucide-react';

export const metadata = {
  title: 'About — Sharo',
  description: 'Learn about Sharo temporary file sharing application.',
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-6 sm:py-10 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-orange-600" />
          <span>Simple, Private & Fast</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About <span className="text-orange-600 font-black">Sharo.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto font-normal">
          Temporary file sharing built for maximum speed, privacy, and simplicity.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-orange-100/60 card-shadow space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          Our Purpose
        </h2>
        <p className="text-slate-600 leading-relaxed text-base">
          Traditional file sharing often forces users to create accounts, manage bloated cloud folders, and leave sensitive documents exposed online forever.
        </p>
        <p className="text-slate-600 leading-relaxed text-base">
          <strong className="text-slate-900">Sharo</strong> was created to rethink file transfers: upload a file, send a private link to your recipient, let them download it, and let the file automatically expire and vanish.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/60 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Privacy First</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No registration or login needed. Your files are accessible strictly via your unique, random share URL.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/60 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Storage Bloat</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Built-in auto-expiration timers ensure that temporary files do not stay around indefinitely.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/60 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Lightning Fast</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Instant automatic uploads, direct streaming downloads, and real-time download counter tracking.
          </p>
        </div>
      </div>

      {/* Modern Tech Stack Badge Box */}
      <div className="bg-white rounded-3xl p-8 border border-orange-100/60 card-shadow space-y-4">
        <div className="flex items-center gap-3">
          <Code2 className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-bold text-slate-900">Modern Portfolio Tech Stack</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sharo is built with Next.js 16 App Router, Tailwind CSS, Prisma ORM, MongoDB Atlas, and Vercel Blob storage.
        </p>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base transition-all shadow-lg shadow-orange-600/25 hover:scale-105"
        >
          <span>Share Your First File</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
