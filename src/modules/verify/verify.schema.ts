import z from 'zod';

export const VerifyUrlSchema = z.object({
    message: z.string().trim().min(1),
});