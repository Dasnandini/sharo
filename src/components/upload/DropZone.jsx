'use client';

import React, { useState, useRef } from 'react';
import { FolderUp, Folder } from 'lucide-react';

export default function DropZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-8 sm:p-10 card-shadow border border-orange-100/60 space-y-6">
      {/* Dashed Drop Container in Warm Orange */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
          isDragging
            ? 'border-orange-500 bg-orange-50/60 scale-[1.01]'
            : 'border-orange-200/90 hover:border-orange-400 bg-orange-50/20 hover:bg-orange-50/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Soft Orange Circle Icon */}
        <div className="w-20 h-20 rounded-full bg-orange-100/80 flex items-center justify-center text-orange-600 transition-transform group-hover:scale-105">
          <FolderUp className="w-9 h-9 text-orange-600 stroke-[1.75]" />
        </div>

        {/* Primary & Secondary Drag Text */}
        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-bold text-slate-800">
            {isDragging ? 'Release to drop files' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-slate-400 font-normal">
            or <span className="text-slate-400 underline underline-offset-2">click to upload</span>
          </p>
        </div>
      </div>

      {/* Divider OR */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80"></div>
        </div>
        <div className="relative bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
          OR
        </div>
      </div>

      {/* Upload Folder Button */}
      <div className="flex justify-center">
        <input
          ref={folderInputRef}
          type="file"
          webkitdirectory="true"
          directory="true"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => (folderInputRef.current || fileInputRef.current)?.click()}
          className="px-6 py-2.5 rounded-xl border border-orange-200 text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-colors flex items-center gap-2"
        >
          <Folder className="w-4 h-4 text-orange-600" />
          <span>Upload Folder</span>
        </button>
      </div>
    </div>
  );
}
