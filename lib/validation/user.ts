import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  username: z.string().min(3, 'Mínimo 3 caracteres').max(20, 'Máximo 20 caracteres'),
  password: z.string().min(8, 'Mínimo 8 caracteres').regex(/[A-Z]/, 'Debe contener una mayúscula').regex(/[0-9]/, 'Debe contener un número'),
  firstName: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellido requerido'),
  countryId: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  profileImage: z.string().url().optional(),
  city: z.string().optional(),
  countryId: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
