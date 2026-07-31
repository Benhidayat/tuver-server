import type { Bank } from "../../../generated/prisma/client.js";

export type VerifyResult = 
    | {
        verified: true,
        bank: Bank
      }
    | {
        verified: false,
        bank: null
      };

export interface MessageUrlDetail {
    domain: string | null,
    hasIp: boolean,
    subdomains: string[],
    hasNestedUrl: boolean
};