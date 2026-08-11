'use client';

import React, { useState } from 'react';
import DropZone from '@/components/upload/DropZone';
import ExpirationSelector from '@/components/upload/ExpirationSelector';
import FilePreview from '@/components/upload/FilePreview';
import ShareCard from '@/components/upload/ShareCard';
import { validateFile } from '@/lib/file-validation';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Link as LinkIcon, 
  Lock, 
  AlertCircle,
  UploadCloud
} from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expiration, setExpiration] = useState('24h');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Automatic Instant Upload Handler
  const handleFileSelectAndUpload = async (file, currentExpiration = expiration) => {
    setErrorMessage('');
    const validation = validateFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error);
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(15);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('expiration', currentExpiration);

      // Simulate smooth upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed. Please try again.');
      }

      setTimeout(() => {
        setUploadedData(data.file);
        setIsUploading(false);
      }, 400);
    } catch (err) {
      console.error('Upload Error:', err);
      setErrorMessage(err.message || 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage('');
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadedData(null);
    setUploadProgress(0);
    setIsUploading(false);
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-10 py-4 sm:py-8">
      {/* Hero Header */}
      {!uploadedData && (
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Share files, <span className="text-orange-600 font-extrabold">simply.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto font-normal">
            Upload your files or folders and get a secure link to share
          </p>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="w-full max-w-xl p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-3 animate-fade-in shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Central Interactive Content Area */}
      <div className="w-full max-w-xl space-y-6">
        {uploadedData ? (
          /* State 1: Upload Completed (Share Card) */
          <ShareCard fileData={uploadedData} onReset={handleReset} />
        ) : isUploading || selectedFile ? (
          /* State 2: Instant Uploading Progress */
          <div className="space-y-6">
            <FilePreview
              file={selectedFile}
              progress={uploadProgress}
              isUploading={isUploading}
              onRemove={handleRemoveFile}
            />
          </div>
        ) : (
          /* State 3: Idle State (DropZone + Expiration) */
          <div className="space-y-4">
            <DropZone onFileSelect={handleFileSelectAndUpload} />
            <ExpirationSelector value={expiration} onChange={setExpiration} />
          </div>
        )}
      </div>

      {/* 4 Feature Pill Cards */}
      {!uploadedData && (
        <div className="w-full space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100/60 card-shadow card-shadow-hover flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-bold text-slate-900 text-sm">Instant Sharing</h4>
                <p className="text-xs text-slate-400 font-medium">Get link in seconds</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100/60 card-shadow card-shadow-hover flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-bold text-slate-900 text-sm">Secure & Private</h4>
                <p className="text-xs text-slate-400 font-medium">Your files are safe</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100/60 card-shadow card-shadow-hover flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-bold text-slate-900 text-sm">Auto Expiry</h4>
                <p className="text-xs text-slate-400 font-medium">Files delete automatically</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100/60 card-shadow card-shadow-hover flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <LinkIcon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-bold text-slate-900 text-sm">No Sign Up</h4>
                <p className="text-xs text-slate-400 font-medium">Start sharing right away</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 pt-2">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Your files are safe and only accessible with the link</span>
          </div>
        </div>
      )}
    </div>
  );
}
