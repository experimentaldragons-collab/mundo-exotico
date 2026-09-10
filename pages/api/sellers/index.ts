import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { apiHandler, validateMethod, requireAuth } from '@/lib/api/middleware';
import { createApiResponse, ApiError } from '@/lib/api/response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import { CreateSellerSchema } from '@/lib/validation/seller';

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

    if (req.method === 'GET') {
      const seller = await prisma.seller.findUnique({
        where: { userId },
        include: {
          user: { select: { email: true, firstName: true, lastName: true } },
          listings: { select: { id: true, title: true, status: true } },
        },
      });

      if (!seller) {
        throw new ApiError(404, 'No tienes una tienda', 'NO_SELLER');
      }

      return seller;
    }

    if (req.method === 'POST') {
      // Check if seller already exists
      const existingSeller = await prisma.seller.findUnique({
        where: { userId },
      });

      if (existingSeller) {
        throw new ApiError(400, 'Ya tienes una tienda registrada', 'SELLER_EXISTS');
      }

      const validatedData = CreateSellerSchema.parse(req.body);

      // Check if store slug is unique
      const existingSlug = await prisma.seller.findUnique({
        where: { storeSlug: validatedData.storeSlug },
      });

      if (existingSlug) {
        throw new ApiError(400, 'Este nombre de tienda ya está en uso', 'SLUG_EXISTS');
      }

      const seller = await prisma.seller.create({
        data: {
          ...validatedData,
          userId,
          verificationStatus: 'PENDING',
        },
        include: {
          user: { select: { email: true, firstName: true, lastName: true } },
        },
      });

      return { message: 'Tienda creada exitosamente', seller };
    }
  });
}
