import z from 'zod';

export const VerifyMessageSchema = z.object({
    message: z.string().trim().min(1),
});