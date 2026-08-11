import DownloadCard from '@/components/share/DownloadCard';
import ExpiredCard from '@/components/share/ExpiredCard';
import DeletedCard from '@/components/share/DeletedCard';
import { prisma, ensureDbInitialized } from '@/lib/db';
import { isExpired } from '@/lib/expiration';

export async function generateMetadata({ params }) {
  const { shareId } = await params;
  return {
    title: `Shared File ${shareId} — Sharo`,
    description: 'Download a shared temporary file on Sharo.',
  };
}

export default async function RecipientPage({ params }) {
  await ensureDbInitialized();
  const { shareId } = await params;

  if (!shareId) {
    return <DeletedCard />;
  }

  const fileRecord = await prisma.fileShare.findUnique({
    where: { shareId },
  });

  if (!fileRecord) {
    return <DeletedCard />;
  }

  if (fileRecord.status === 'DELETED') {
    return <DeletedCard />;
  }

  if (fileRecord.status === 'EXPIRED' || isExpired(fileRecord.expiresAt)) {
    if (fileRecord.status !== 'EXPIRED') {
      await prisma.fileShare.update({
        where: { shareId },
        data: { status: 'EXPIRED' },
      });
    }
    return <ExpiredCard />;
  }

  const fileData = {
    shareId: fileRecord.shareId,
    originalName: fileRecord.originalName,
    size: fileRecord.size,
    mimeType: fileRecord.mimeType,
    blobUrl: fileRecord.blobUrl,
    expiresAt: fileRecord.expiresAt.toISOString(),
    downloadCount: fileRecord.downloadCount,
    createdAt: fileRecord.createdAt.toISOString(),
  };

  return <DownloadCard fileData={fileData} />;
}
