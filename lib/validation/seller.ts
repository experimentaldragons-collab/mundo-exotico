import { z } from 'zod';
import { VerificationStatus } from '@prisma/client';

export const CreateSellerSchema = z.object({
  storeName: z.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres'),
  storeSlug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, 'Solo letras, números y guiones'),
  storeDescription: z.string().min(10).max(1000).optional(),
  city: z.string().min(2),
  state: z.string().optional(),
  countryId: z.string().uuid(),
});

export const UpdateSellerSchema = CreateSellerSchema.partial();

export const UpdateSellerBrandingSchema = z.object({
  storeLogo: z.string().url().optional(),
  storeBanner: z.string().url().optional(),
  customBranding: z.object({}).passthrough().optional(),
  socialLinks: z.object({}).passthrough().optional(),
});

export type CreateSellerInput = z.infer<typeof CreateSellerSchema>;
export type UpdateSellerInput = z.infer<typeof UpdateSellerSchema>;
export type UpdateSellerBrandingInput = z.infer<typeof UpdateSellerBrandingSchema>;
