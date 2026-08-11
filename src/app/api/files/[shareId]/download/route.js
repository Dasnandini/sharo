import { NextResponse } from 'next/server';
import { prisma, ensureDbInitialized } from '@/lib/db';
import { isExpired } from '@/lib/expiration';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    await ensureDbInitialized();
    const { shareId } = await params;

    const fileRecord = await prisma.fileShare.findUnique({
      where: { shareId },
    });

    if (!fileRecord) {
      return NextResponse.json(
        { success: false, error: 'File not found.' },
        { status: 404 }
      );
    }

    if (fileRecord.status === 'DELETED') {
      return NextResponse.json(
        { success: false, error: 'This file has been deleted.' },
        { status: 410 }
      );
    }

    if (fileRecord.status === 'EXPIRED' || isExpired(fileRecord.expiresAt)) {
      if (fileRecord.status !== 'EXPIRED') {
        await prisma.fileShare.update({
          where: { shareId },
          data: { status: 'EXPIRED' },
        });
      }
      return NextResponse.json(
        { success: false, error: 'This file link has expired.' },
        { status: 410 }
      );
    }

    // Increment download counter
    await prisma.fileShare.update({
      where: { shareId },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    const safeFilename = encodeURIComponent(fileRecord.originalName);

    // 1. Local filesystem storage
    if (fileRecord.blobUrl.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', fileRecord.blobUrl);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { success: false, error: 'File resource missing on server.' },
          { status: 404 }
        );
      }

      const fileBuffer = await fs.promises.readFile(filePath);
      const headers = new Headers();
      headers.set('Content-Type', fileRecord.mimeType || 'application/octet-stream');
      headers.set(
        'Content-Disposition',
        `attachment; filename="${safeFilename}"; filename*=UTF-8''${safeFilename}`
      );
      headers.set('Content-Length', fileBuffer.length.toString());

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    }

    // 2. Vercel Blob / Remote Storage (Stream as attachment to force download instead of viewing in browser)
    const blobResponse = await fetch(fileRecord.blobUrl);
    if (!blobResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch blob file for download.' },
        { status: 500 }
      );
    }

    const fileArrayBuffer = await blobResponse.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', fileRecord.mimeType || 'application/octet-stream');
    headers.set(
      'Content-Disposition',
      `attachment; filename="${safeFilename}"; filename*=UTF-8''${safeFilename}`
    );
    headers.set('Content-Length', fileArrayBuffer.byteLength.toString());

    return new NextResponse(fileArrayBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('File Download Error:', error);
    return NextResponse.json(
      { success: false, error: 'Download failed.' },
      { status: 500 }
    );
  }
}
