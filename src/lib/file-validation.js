export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB limit

/**
 * Format bytes to human readable string (e.g., 12.4 MB, 840 KB, 1.2 GB)
 * @param {number} bytes 
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0 || !bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  return `${formatted} ${sizes[i]}`;
}

/**
 * Categorize file by mime type or file extension
 * @param {string} mimeType 
 * @param {string} filename 
 * @returns {'image' | 'video' | 'audio' | 'pdf' | 'document' | 'code' | 'archive' | 'other'}
 */
export function getFileCategory(mimeType = '', filename = '') {
  const mime = (mimeType || '').toLowerCase();
  const ext = (filename.split('.').pop() || '').toLowerCase();

  if (mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
    return 'image';
  }
  if (mime.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov', 'mkv', 'avi'].includes(ext)) {
    return 'video';
  }
  if (mime.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(ext)) {
    return 'audio';
  }
  if (mime === 'application/pdf' || ext === 'pdf') {
    return 'pdf';
  }
  if (
    mime.includes('word') ||
    mime.includes('excel') ||
    mime.includes('powerpoint') ||
    mime.includes('officedocument') ||
    ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'csv'].includes(ext)
  ) {
    return 'document';
  }
  if (
    mime.includes('javascript') ||
    mime.includes('json') ||
    mime.includes('html') ||
    mime.includes('css') ||
    mime.includes('xml') ||
    ['js', 'jsx', 'ts', 'tsx', 'json', 'html', 'css', 'py', 'java', 'c', 'cpp', 'rs', 'go', 'sh', 'md'].includes(ext)
  ) {
    return 'code';
  }
  if (
    mime.includes('zip') ||
    mime.includes('compressed') ||
    mime.includes('tar') ||
    mime.includes('rar') ||
    ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)
  ) {
    return 'archive';
  }

  return 'other';
}

/**
 * Returns a clean user-friendly label for a file type
 * @param {string} mimeType 
 * @param {string} filename 
 * @returns {string}
 */
export function getFileTypeLabel(mimeType = '', filename = '') {
  const cat = getFileCategory(mimeType, filename);
  const ext = (filename.split('.').pop() || '').toUpperCase();

  switch (cat) {
    case 'image':
      return `${ext || 'IMAGE'} Image`;
    case 'video':
      return `${ext || 'VIDEO'} Video`;
    case 'audio':
      return `${ext || 'AUDIO'} Audio`;
    case 'pdf':
      return 'PDF Document';
    case 'document':
      if (['XLS', 'XLSX', 'CSV'].includes(ext)) return 'Spreadsheet';
      if (['DOC', 'DOCX'].includes(ext)) return 'Word Document';
      if (['PPT', 'PPTX'].includes(ext)) return 'Presentation';
      return `${ext} Document`;
    case 'code':
      return `${ext} Source File`;
    case 'archive':
      return `${ext} Archive`;
    default:
      return ext ? `${ext} File` : 'Binary File';
  }
}

/**
 * Server-side and client-side file validator
 * @param {File | { size: number }} file 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 50 MB limit (${formatFileSize(file.size)}).`,
    };
  }
  return { valid: true };
}
