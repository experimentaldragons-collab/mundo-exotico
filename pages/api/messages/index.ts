import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { apiHandler, validateMethod, requireAuth } from '@/lib/api/middleware';
import { createApiResponse, ApiError } from '@/lib/api/response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import { CreateMessageSchema } from '@/lib/validation/community';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, ['POST', 'GET'])) {
    return res.status(405).json(createApiResponse(false, undefined, 'Método no permitido'));
  }

  const session = await getServerSession(req, res, authOptions);

  if (!requireAuth(session)) {
    return res.status(401).json(createApiResponse(false, undefined, 'No autorizado'));
  }

  return apiHandler(req, res, async () => {
    const userId = session?.user?.id;
    const { conversationId } = req.query;

    if (req.method === 'GET') {
      const messages = await prisma.message.findMany({
        where: { conversationId: conversationId as string },
        include: {
          sender: { select: { id: true, username: true, profileImage: true } },
          listing: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });

      return messages;
    }

    if (req.method === 'POST') {
      const validatedData = CreateMessageSchema.parse(req.body);

      // Verify user is part of conversation
      const conversation = await prisma.conversation.findUnique({
        where: { id: validatedData.conversationId },
      });

      if (!conversation || (conversation.buyerId !== userId && conversation.sellerId !== userId)) {
        throw new ApiError(403, 'No tienes acceso a esta conversación', 'FORBIDDEN');
      }

      const message = await prisma.message.create({
        data: {
          ...validatedData,
          senderId: userId,
        },
        include: {
          sender: { select: { username: true, profileImage: true } },
        },
      });

      // Update conversation lastMessageAt
      await prisma.conversation.update({
        where: { id: validatedData.conversationId },
        data: { lastMessageAt: new Date() },
      });

      return message;
    }
  });
}
