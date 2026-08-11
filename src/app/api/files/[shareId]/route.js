import { NextResponse } from 'next/server';
import { prisma, ensureDbInitialized } from '@/lib/db';
import { isExpired } from '@/lib/expiration';

export async function GET(request, { params }) {
  try {
    await ensureDbInitialized();
    const { shareId } = await params;

    if (!shareId) {
      return NextResponse.json(
        { success: false, error: 'Share ID is required.' },
        { status: 400 }
      );
    }

    const fileRecord = await prisma.fileShare.findUnique({
      where: { shareId },
    });

    if (!fileRecord) {
      return NextResponse.json(
        { success: false, status: 'NOT_FOUND', error: 'This sharing link does not exist.' },
        { status: 404 }
      );
    }

    if (fileRecord.status === 'DELETED') {
      return NextResponse.json({
        success: true,
        status: 'DELETED',
        message: 'This file has been deleted.',
      });
    }

    // Check expiration server-side
    if (fileRecord.status === 'EXPIRED' || isExpired(fileRecord.expiresAt)) {
      if (fileRecord.status !== 'EXPIRED') {
        await prisma.fileShare.update({
          where: { shareId },
          data: { status: 'EXPIRED' },
        });
      }

      return NextResponse.json({
        success: true,
        status: 'EXPIRED',
        message: 'This sharing link has expired.',
      });
    }

    return NextResponse.json({
      success: true,
      status: 'ACTIVE',
      file: {
        shareId: fileRecord.shareId,
        originalName: fileRecord.originalName,
        size: fileRecord.size,
        mimeType: fileRecord.mimeType,
        blobUrl: fileRecord.blobUrl,
        expiresAt: fileRecord.expiresAt,
        downloadCount: fileRecord.downloadCount,
        createdAt: fileRecord.createdAt,
      },
    });
  } catch (error) {
    console.error('Fetch File Details Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
