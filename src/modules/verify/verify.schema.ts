import z from 'zod';

export const VerifyUrlSchema = z.object({
    domain: z.string()
});