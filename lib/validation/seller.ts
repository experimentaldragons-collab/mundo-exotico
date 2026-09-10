import { z } from 'zod';

export const CreateSellerSchema = z.object({
  storeName: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  storeSlug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, 'Solo letras, números y guiones'),
  description: z.string().min(10).max(500).optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  phone: z.string().regex(/^\+?[0-9]{10,}$/, 'Teléfono inválido').optional(),
});

export type CreateSellerInput = z.infer<typeof CreateSellerSchema>;

export const UpdateSellerSchema = CreateSellerSchema.partial();

export type UpdateSellerInput = z.infer<typeof UpdateSellerSchema>;
