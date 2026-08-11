'use client';

import React from 'react';
import { Trash2, Send } from 'lucide-react';
import Link from 'next/link';

export default function DeletedCard() {
  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 card-shadow border border-orange-100/60 text-center space-y-6 mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200/80 flex items-center justify-center mx-auto text-rose-600 shadow-sm">
        <Trash2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          File Expired
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          This sharing link has been deleted by the owner and is no longer available.
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
