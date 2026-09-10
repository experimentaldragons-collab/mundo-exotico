import { z } from 'zod';

export const CreateMessageSchema = z.object({
  conversationId: z.string().uuid('Conversación inválida'),
  content: z.string().min(1, 'Mensaje no puede estar vacío').max(5000, 'Mensaje muy largo'),
  attachments: z.array(z.string().url()).optional(),
});

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;
