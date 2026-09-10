import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { apiHandler, validateMethod, requireAuth } from '@/lib/api/middleware';
import { createApiResponse, ApiError } from '@/lib/api/response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, ['GET'])) {
    return res.status(405).json(createApiResponse(false, undefined, 'Método no permitido'));
  }

  const session = await getServerSession(req, res, authOptions);

  if (!requireAuth(session)) {
    return res.status(401).json(createApiResponse(false, undefined, 'No autorizado'));
  }

  return apiHandler(req, res, async () => {
    const userId = session?.user?.id;

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ buyerId: userId }, { sellerId: userId }],
      },
      include: {
        buyer: { select: { id: true, username: true, profileImage: true } },
        seller: { select: { id: true, username: true, profileImage: true } },
        listing: { select: { id: true, title: true, images: { take: 1 } } },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: { content: true, createdAt: true },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    return conversations;
  });
}
