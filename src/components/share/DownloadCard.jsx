'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Clock, 
  FileText, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileCode, 
  Archive, 
  File, 
  CheckCircle2,
  Send,
  ZoomIn,
  X
} from 'lucide-react';
import { formatFileSize, getFileCategory, getFileTypeLabel } from '@/lib/file-validation';
import { formatTimeRemaining } from '@/lib/expiration';

export default function DownloadCard({ fileData }) {
  const [downloadCount, setDownloadCount] = useState(fileData.downloadCount || 0);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const category = getFileCategory(fileData.mimeType, fileData.originalName);
  const typeLabel = getFileTypeLabel(fileData.mimeType, fileData.originalName);

  const handleDownload = () => {
    setIsDownloading(true);

    // Create invisible anchor to trigger direct API download endpoint
    const link = document.createElement('a');
    link.href = `/api/files/${fileData.shareId}/download`;
    link.download = fileData.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update state feedback after download trigger
    setTimeout(() => {
      setDownloadCount((prev) => prev + 1);
      setHasDownloaded(true);
      setIsDownloading(false);
    }, 800);
  };

  const renderFilePreview = () => {
    if (category === 'image' && fileData.blobUrl) {
      return (
        <div 
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full max-h-[550px] min-h-[250px] overflow-hidden flex items-center justify-center p-2 cursor-zoom-in group transition-all"
          title="Click to view full size"
        >
          <img
            src={fileData.blobUrl}
            alt={fileData.originalName}
            className="max-h-[520px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          {/* Hover Zoom Hint Overlay */}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to enlarge</span>
          </div>
        </div>
      );
    }

    if (category === 'video' && fileData.blobUrl) {
      return (
        <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-1">
          <video
            src={fileData.blobUrl}
            controls
            className="w-full max-h-[500px] rounded-xl object-contain"
          />
        </div>
      );
    }

    if (category === 'audio' && fileData.blobUrl) {
      return (
        <div className="w-full p-4 rounded-2xl bg-orange-50 border border-orange-100 space-y-3">
          <div className="flex items-center gap-3 text-orange-600">
            <FileAudio className="w-6 h-6 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Audio Player</span>
          </div>
          <audio src={fileData.blobUrl} controls className="w-full" />
        </div>
      );
    }

    // Default icon graphics box
    const getBigIcon = () => {
      switch (category) {
        case 'pdf': return <FileText className="w-16 h-16 text-rose-500" />;
        case 'document': return <FileText className="w-16 h-16 text-orange-600" />;
        case 'code': return <FileCode className="w-16 h-16 text-emerald-600" />;
        case 'archive': return <Archive className="w-16 h-16 text-amber-500" />;
        case 'image': return <FileImage className="w-16 h-16 text-orange-600" />;
        default: return <File className="w-16 h-16 text-slate-400" />;
      }
    };

    return (
      <div className="w-full h-56 rounded-2xl bg-orange-50/40 border border-orange-100/60 flex flex-col items-center justify-center gap-3">
        <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
          {getBigIcon()}
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {typeLabel}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 card-shadow border border-orange-100/60 mx-auto">
        {/* Properly Aligned Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 text-left">
          {/* Left Title Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-sm">
              <Send className="w-6 h-6 -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Someone shared a file with you
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Secure, temporary download link
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Metadata Pill */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Available for {formatTimeRemaining(fileData.expiresAt)}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-slate-500 font-mono">
                Downloads: <span className="text-slate-900 font-bold">{downloadCount}</span>
              </div>
            </div>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                hasDownloaded
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 scale-[1.01]'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/25 hover:scale-[1.01]'
              }`}
            >
              {hasDownloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Downloaded ✓</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Downloading...' : 'Download File'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Large File Information & Preview Card */}
        <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 sm:p-6 space-y-4">
          {renderFilePreview()}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-left">
            <h3 className="text-lg font-bold text-slate-900 truncate max-w-full" title={fileData.originalName}>
              {fileData.originalName}
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 shrink-0">
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                {formatFileSize(fileData.size)}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-100 text-orange-600 font-bold">
                {typeLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Screen Image Viewing */}
      {isLightboxOpen && category === 'image' && fileData.blobUrl && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[90vh] space-y-3 text-center">
            <img
              src={fileData.blobUrl}
              alt={fileData.originalName}
              className="max-h-[80vh] max-w-full object-contain mx-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-sm font-semibold tracking-wide bg-slate-900/80 px-4 py-2 rounded-full inline-block">
              {fileData.originalName} ({formatFileSize(fileData.size)})
            </p>
          </div>
        </div>
      )}
    </>
  );
}
