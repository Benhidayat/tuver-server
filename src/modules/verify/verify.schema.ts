import z from 'zod';
import { isSupportedCountry, type CountryCode } from 'libphonenumber-js';


export const VerifyMessageSchema = z.object({
    message: z.string().trim().min(1),
    country: z.string().refine(
        (country): country is CountryCode =>
            isSupportedCountry(country),
        'Invalid country code'
    )
});