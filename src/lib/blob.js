import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

/**
 * Uploads a file buffer/blob to Vercel Blob storage, or local disk fallback
 * @param {File | Buffer} file 
 * @param {string} filename 
 * @returns {Promise<{ url: string }>}
 */
export async function uploadBlob(file, filename) {
  const hasVercelToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (hasVercelToken) {
    try {
      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: true,
      });
      return { url: blob.url };
    } catch (err) {
      console.warn('Vercel Blob upload failed, falling back to local storage:', err.message);
    }
  }

  // Local filesystem fallback
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = path.join(uploadsDir, safeFilename);

  let buffer;
  if (Buffer.isBuffer(file)) {
    buffer = file;
  } else if (file.arrayBuffer && typeof file.arrayBuffer === 'function') {
    const arrayBuf = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuf);
  } else {
    throw new Error('Unsupported file buffer format for upload');
  }

  await fs.promises.writeFile(filePath, buffer);
  return { url: `/uploads/${safeFilename}` };
}

/**
 * Deletes a file blob from Vercel Blob or local disk
 * @param {string} blobUrl 
 */
export async function deleteBlob(blobUrl) {
  if (!blobUrl) return;

  if (blobUrl.startsWith('http://') || blobUrl.startsWith('https://')) {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await del(blobUrl);
        return;
      } catch (err) {
        console.warn('Failed to delete Vercel blob:', err.message);
      }
    }
  }

  // Local filesystem fallback deletion
  if (blobUrl.startsWith('/uploads/')) {
    const filename = path.basename(blobUrl);
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.warn('Failed to unlink local file:', err.message);
      }
    }
  }
}
