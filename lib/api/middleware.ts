import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, handleApiError, createApiResponse } from './response';

export async function apiHandler<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<any>
) {
  try {
    const result = await handler(req, res);
    
    if (!res.headersSent) {
      res.status(200).json(createApiResponse(true, result));
    }
  } catch (error) {
    const apiError = handleApiError(error);
    
    if (!res.headersSent) {
      res.status(apiError.statusCode).json(
        createApiResponse(false, undefined, apiError.message, apiError.code)
      );
    }
  }
}

export const validateMethod = (
  req: NextApiRequest,
  allowedMethods: string[]
): boolean => {
  if (!req.method || !allowedMethods.includes(req.method)) {
    return false;
  }
  return true;
};

export const requireAuth = (session: any): boolean => {
  return !!session?.user?.id;
};

export const requireRole = (session: any, roles: string[]): boolean => {
  return requireAuth(session) && roles.includes(session.user.role);
};
