import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/lib/validation/user';
import { apiHandler, validateMethod } from '@/lib/api/middleware';
import { createApiResponse, ApiError } from '@/lib/api/response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, ['POST'])) {
    return res.status(405).json(createApiResponse(false, undefined, 'Método no permitido'));
  }

  return apiHandler(req, res, async () => {
    const validatedData = RegisterSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username },
        ],
      },
    });

    if (existingUser) {
      throw new ApiError(
        400,
        existingUser.email === validatedData.email
          ? 'Este email ya está registrado'
          : 'Este usuario ya existe',
        'USER_EXISTS'
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        countryId: validatedData.countryId,
        role: 'USER',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    return { message: 'Usuario registrado exitosamente', user };
  });
}
