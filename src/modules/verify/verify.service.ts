import * as bankRepository from './verify.repository.js';
import type { VerifyResult } from './verify.types.js';
import { normalizeTextAndAliases } from '../../helpers/verify.helper.js';

export const verifyUrl = async(domain: string): Promise<VerifyResult> => {
    
    const bank = await bankRepository.findDomain(domain);
    
    if (!bank) {
        return {
            verified: false,
            bank: null
        };
    }

    return {
        verified: true,
        bank
    };
};


export const verifyMessage = async (message: string) => {

    const normalizedMessage = normalizeTextAndAliases(message);
    const searchableMessage = ` ${normalizedMessage} `;

    const aliases = await  bankRepository.getAllAliases();

    for (const alias of aliases) {
        const normalizedAlias = normalizeTextAndAliases(alias.alias);
        const searchableAlias = ` ${normalizedAlias} `;

        if (searchableMessage.includes(searchableAlias)) {
            return alias
        };
    }

    return null;
};