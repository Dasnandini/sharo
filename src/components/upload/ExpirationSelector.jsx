'use client';

import React from 'react';
import { Clock } from 'lucide-react';

const EXPIRATION_OPTIONS = [
  { value: '1h', label: '1 Hour' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
];

export default function ExpirationSelector({ value, onChange }) {
  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-orange-100/60 card-shadow space-y-2.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-slate-500 font-bold">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          Expiration Time
        </span>
        <span className="text-[11px] text-slate-400 font-normal">Files delete automatically</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-50 rounded-xl border border-slate-200/60">
        {EXPIRATION_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`py-2 px-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-sm scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isSelected ? 'bg-white' : 'bg-slate-400'
                }`}
              />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
