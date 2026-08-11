import { NextResponse } from 'next/server';
import { prisma, ensureDbInitialized } from '@/lib/db';
import { generateShareId } from '@/lib/share-id';
import { calculateExpiresAt } from '@/lib/expiration';
import { validateFile } from '@/lib/file-validation';
import { uploadBlob } from '@/lib/blob';

export async function POST(request) {
  try {
    await ensureDbInitialized();

    const formData = await request.formData();
    const file = formData.get('file');
    const expiration = formData.get('expiration') || '24h';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in request.' },
        { status: 400 }
      );
    }

    // Server-side validation
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const shareId = generateShareId(8);
    const expiresAt = calculateExpiresAt(expiration);

    // Upload file to Vercel Blob or local disk fallback
    const { url: blobUrl } = await uploadBlob(file, file.name);

    // Save to Database
    const fileShare = await prisma.fileShare.create({
      data: {
        shareId,
        originalName: file.name,
        blobUrl,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        expiresAt,
        status: 'ACTIVE',
      },
    });

    const origin = request.headers.get('origin') || request.nextUrl.origin;
    const shareUrl = `${origin}/s/${shareId}`;

    return NextResponse.json({
      success: true,
      file: {
        id: fileShare.id,
        shareId: fileShare.shareId,
        originalName: fileShare.originalName,
        size: fileShare.size,
        mimeType: fileShare.mimeType,
        blobUrl: fileShare.blobUrl,
        expiresAt: fileShare.expiresAt,
        downloadCount: fileShare.downloadCount,
        shareUrl,
      },
    });
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
