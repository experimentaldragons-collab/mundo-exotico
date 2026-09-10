import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { apiHandler, validateMethod, requireAuth } from '@/lib/api/middleware';
import { createApiResponse, ApiError } from '@/lib/api/response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import { CreateListingSchema } from '@/lib/validation/listing';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, ['GET', 'POST'])) {
    return res.status(405).json(createApiResponse(false, undefined, 'Método no permitido'));
  }

  return apiHandler(req, res, async () => {
    if (req.method === 'GET') {
      const { categoryId, countryId, limit = 12, offset = 0 } = req.query;

      const where: any = { status: 'ACTIVE' };
      if (categoryId) where.categoryId = categoryId;
      if (countryId) where.countryId = countryId;

      const [listings, total] = await Promise.all([
        prisma.listing.findMany({
          where,
          include: {
            category: true,
            seller: { select: { id: true, storeName: true, isVerified: true } },
            images: { select: { url: true } },
          },
          take: Number(limit),
          skip: Number(offset),
          orderBy: { createdAt: 'desc' },
        }),
        prisma.listing.count({ where }),
      ]);

      return {
        listings,
        pagination: {
          total,
          limit: Number(limit),
          offset: Number(offset),
        },
      };
    }

    if (req.method === 'POST') {
      const session = await getServerSession(req, res, authOptions);

      if (!requireAuth(session)) {
        throw new ApiError(401, 'Debes iniciar sesión', 'UNAUTHORIZED');
      }

      const validatedData = CreateListingSchema.parse(req.body);

      // Verify seller
      const seller = await prisma.seller.findUnique({
        where: { userId: session?.user?.id },
      });

      if (!seller) {
        throw new ApiError(400, 'Debes crear una tienda primero', 'NO_SELLER_ACCOUNT');
      }

      const listing = await prisma.listing.create({
        data: {
          ...validatedData,
          sellerId: seller.id,
          status: 'PENDING_APPROVAL',
        },
        include: {
          category: true,
          seller: true,
        },
      });

      return { message: 'Anuncio creado, pendiente de aprobación', listing };
    }
  });
}
