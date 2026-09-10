import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { ApiError, createApiResponse } from './response';

export function validateMethod(req: NextApiRequest, methods: string[]): boolean {
  return methods.includes(req.method || 'GET');
}

export function requireAuth(session: Session | null): boolean {
  return !!session?.user;
}

export async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: () => Promise<any>
) {
  try {
    const result = await handler();
    return res.status(200).json(createApiResponse(true, result));
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(
          createApiResponse(
            false,
            { code: error.code },
            error.message
          )
        );
    }

    if (error instanceof SyntaxError) {
      return res
        .status(400)
        .json(
          createApiResponse(
            false,
            undefined,
            'JSON inválido'
          )
        );
    }

    console.error('API Error:', error);
    return res
      .status(500)
      .json(
        createApiResponse(
          false,
          undefined,
          'Error interno del servidor'
        )
      );
  }
}
