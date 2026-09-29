import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';
import { BadRequestError } from './appError.js';

export const normalizePhoneNumber = (number: string, countryCode: CountryCode): string => {
    const normalizedNumber = parsePhoneNumberFromString(number, countryCode);

    if (!normalizedNumber || !normalizedNumber.isValid()){
        throw new BadRequestError('Invalid telephone number');
    }

    return normalizedNumber.number;
};