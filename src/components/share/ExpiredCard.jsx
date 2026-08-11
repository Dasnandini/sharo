'use client';

import React from 'react';
import { Clock, Send } from 'lucide-react';
import Link from 'next/link';

export default function ExpiredCard() {
  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 card-shadow border border-orange-100/60 text-center space-y-6 mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
        <Clock className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Link Expired
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          This file is no longer available for download. The expiration time set by the uploader has passed.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          href="/"
          className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-600/20"
        >
          <Send className="w-4 h-4 -rotate-12" />
          <span>Upload New File</span>
        </Link>
      </div>
    </div>
  );
}
