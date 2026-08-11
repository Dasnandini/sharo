'use client';

import React from 'react';
import { 
  FileText, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileCode, 
  Archive, 
  File, 
  X,
  Loader2
} from 'lucide-react';
import { formatFileSize, getFileCategory, getFileTypeLabel } from '@/lib/file-validation';

export default function FilePreview({ file, progress = 0, isUploading = false, onRemove }) {
  if (!file) return null;

  const category = getFileCategory(file.type, file.name);
  const typeLabel = getFileTypeLabel(file.type, file.name);

  const getIcon = () => {
    switch (category) {
      case 'image': return <FileImage className="w-7 h-7 text-orange-600" />;
      case 'video': return <FileVideo className="w-7 h-7 text-purple-600" />;
      case 'audio': return <FileAudio className="w-7 h-7 text-amber-600" />;
      case 'pdf': return <FileText className="w-7 h-7 text-rose-600" />;
      case 'document': return <FileText className="w-7 h-7 text-orange-600" />;
      case 'code': return <FileCode className="w-7 h-7 text-emerald-600" />;
      case 'archive': return <Archive className="w-7 h-7 text-amber-600" />;
      default: return <File className="w-7 h-7 text-slate-500" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 space-y-6 card-shadow border border-orange-100/60">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate leading-snug">
              {file.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                {typeLabel}
              </span>
              <span>•</span>
              <span>{formatFileSize(file.size)}</span>
            </div>
          </div>
        </div>

        {!isUploading && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Upload Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500 flex items-center gap-2">
            {isUploading && <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />}
            {progress < 100 ? 'Uploading file...' : 'Finalizing share link...'}
          </span>
          <span className="text-orange-600 font-mono">{Math.min(100, Math.round(progress))}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
