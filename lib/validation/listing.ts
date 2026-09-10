import { z } from 'zod';
import { ListingType, ApprovalStatus } from '@prisma/client';

export const CreateListingSchema = z.object({
  categoryId: z.string().uuid('Categoría requerida'),
  speciesId: z.string().uuid().optional(),
  title: z.string().min(5, 'Mínimo 5 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(20, 'Mínimo 20 caracteres').max(5000, 'Máximo 5000 caracteres'),
  price: z.number().positive('Precio debe ser positivo'),
  currency: z.string().length(3, 'Código de moneda inválido'),
  countryId: z.string().uuid('País requerido'),
  city: z.string().min(2, 'Ciudad requerida'),
  listingType: z.enum(['ANIMAL', 'PRODUCT', 'SERVICE']).default('ANIMAL'),
  details: z.record(z.string()).optional(),
});

export const UpdateListingSchema = CreateListingSchema.partial();

export const ListingDetailsSchema = z.object({
  fieldName: z.string(),
  fieldValue: z.string(),
  displayOrder: z.number().optional(),
});

export type CreateListingInput = z.infer<typeof CreateListingSchema>;
export type UpdateListingInput = z.infer<typeof UpdateListingSchema>;
export type ListingDetailsInput = z.infer<typeof ListingDetailsSchema>;
