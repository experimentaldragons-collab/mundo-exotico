import { z } from 'zod';

export const CreateListingSchema = z.object({
  title: z.string().min(5, 'Mínimo 5 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(20, 'Mínimo 20 caracteres').max(5000, 'Máximo 5000 caracteres'),
  price: z.number().positive('Precio debe ser positivo'),
  categoryId: z.string().uuid('Categoría inválida'),
  countryId: z.string().uuid('País inválido'),
  breed: z.string().optional(),
  age: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN']).optional(),
  healthStatus: z.string().optional(),
  images: z.array(z.string().url()).min(1, 'Mínimo una imagen').max(10, 'Máximo 10 imágenes'),
  availability: z.enum(['IN_STOCK', 'RESERVED', 'SOLD']).default('IN_STOCK'),
});

export type CreateListingInput = z.infer<typeof CreateListingSchema>;

export const UpdateListingSchema = CreateListingSchema.partial();

export type UpdateListingInput = z.infer<typeof UpdateListingSchema>;

export const ListingFiltersSchema = z.object({
  categoryId: z.string().optional(),
  countryId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
  limit: z.number().default(12),
  offset: z.number().default(0),
});

export type ListingFilters = z.infer<typeof ListingFiltersSchema>;
