import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createApiResponse(
  success: boolean,
  data?: any,
  message?: string
) {
  return {
    success,
    data: data || null,
    message: message || (success ? 'Operación exitosa' : 'Error en la operación'),
  };
}
