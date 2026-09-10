import { z } from 'zod';

export const CreateReviewSchema = z.object({
  orderId: z.string().uuid('Orden requerida'),
  rating: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  comment: z.string().min(10, 'Mínimo 10 caracteres').max(1000, 'Máximo 1000 caracteres').optional(),
});

export const CreateReportSchema = z.object({
  targetType: z.enum(['LISTING', 'USER', 'SELLER', 'MESSAGE', 'REVIEW']),
  targetId: z.string().uuid('Target requerido'),
  reason: z.enum(['SCAM', 'ILLEGAL_ANIMAL', 'FALSE_INFO', 'INAPPROPRIATE', 'BANNED_PRODUCT', 'SPAM', 'OTHER']),
  description: z.string().min(10).max(1000).optional(),
});

export const CreateMessageSchema = z.object({
  conversationId: z.string().uuid('Conversación requerida'),
  content: z.string().min(1, 'Mensaje requerido').max(2000),
  imageUrl: z.string().url().optional(),
  relatedListingId: z.string().uuid().optional(),
});

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;
export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
