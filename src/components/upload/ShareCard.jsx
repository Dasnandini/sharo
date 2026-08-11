'use client';

import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  ExternalLink, 
  Download, 
  Trash2, 
  Clock, 
  FileCheck,
  RotateCcw
} from 'lucide-react';
import { formatTimeRemaining } from '@/lib/expiration';

export default function ShareCard({ fileData, onReset }) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (!fileData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fileData.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this file share? The link will immediately stop working.')) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/files/${fileData.shareId}/delete`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setDeleted(true);
      } else {
        alert(data.error || 'Failed to delete file.');
      }
    } catch (err) {
      alert('Error deleting file.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (deleted) {
    return (
      <div className="w-full bg-white rounded-3xl p-8 text-center space-y-6 card-shadow border border-orange-100/60">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">File Deleted Successfully</h3>
          <p className="text-sm text-slate-500">This sharing link is no longer available for access or download.</p>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Upload Another File</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 space-y-6 card-shadow border border-orange-100/60">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Upload complete</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </h3>
            <p className="text-xs text-slate-500">Your file is ready to share securely</p>
          </div>
        </div>

        {/* Expiry Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold shrink-0">
          <Clock className="w-3.5 h-3.5" />
          <span>Expires in {formatTimeRemaining(fileData.expiresAt)}</span>
        </div>
      </div>

      {/* Share Link Input Box */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Private Share Link
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200/80 rounded-2xl font-mono text-sm text-orange-600 truncate font-semibold">
            {fileData.shareUrl}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm shrink-0 flex items-center justify-center gap-2 transition-all duration-200 ${
              copied
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Copy className="w-3.5 h-3.5 text-orange-600" />
          <span>Copy link</span>
        </button>

        <a
          href={fileData.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
          <span>Open link</span>
        </a>

        <a
          href={`/api/files/${fileData.shareId}/download`}
          download
          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600" />
          <span>Download preview</span>
        </a>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isDeleting ? 'Deleting...' : 'Delete file'}</span>
        </button>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 font-medium transition-colors"
        >
          Upload another file
        </button>
      </div>
    </div>
  );
}
