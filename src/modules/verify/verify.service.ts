import * as bankRepository from './verify.repository.js';
import type { VerifyResult } from './verify.types.js';

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