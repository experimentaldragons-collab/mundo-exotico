import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import { apiHandler, validateMethod, requireAuth } from '@/lib/api/middleware';
import { createApiResponse } from '@/lib/api/response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, ['GET', 'PUT'])) {
    return res.status(405).json(createApiResponse(false, undefined, 'Método no permitido'));
  }

  const session = await getServerSession(req, res, authOptions);

  if (!requireAuth(session)) {
    return res.status(401).json(createApiResponse(false, undefined, 'No autorizado'));
  }

  return apiHandler(req, res, async () => {
    const userId = session?.user?.id;

    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          profileImage: true,
          city: true,
          country: true,
          createdAt: true,
          role: true,
          seller: {
            select: {
              id: true,
              storeName: true,
              storeSlug: true,
              isVerified: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json(createApiResponse(false, undefined, 'Usuario no encontrado'));
      }

      return user;
    }

    if (req.method === 'PUT') {
      const { firstName, lastName, profileImage, city, countryId } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(profileImage && { profileImage }),
          ...(city && { city }),
          ...(countryId && { countryId }),
        },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          profileImage: true,
          city: true,
        },
      });

      return { message: 'Perfil actualizado', user };
    }
  });
}
