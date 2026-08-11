import { NextResponse } from 'next/server';
import { prisma, ensureDbInitialized } from '@/lib/db';
import { deleteBlob } from '@/lib/blob';

export async function DELETE(request, { params }) {
  try {
    await ensureDbInitialized();
    const { shareId } = await params;

    const fileRecord = await prisma.fileShare.findUnique({
      where: { shareId },
    });

    if (!fileRecord) {
      return NextResponse.json(
        { success: false, error: 'File share record not found.' },
        { status: 404 }
      );
    }

    // Delete blob/file
    await deleteBlob(fileRecord.blobUrl);

    // Update status in DB to DELETED
    await prisma.fileShare.update({
      where: { shareId },
      data: { status: 'DELETED' },
    });

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully. This sharing link is no longer available.',
    });
  } catch (error) {
    console.error('File Delete Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete file.' },
      { status: 500 }
    );
  }
}
