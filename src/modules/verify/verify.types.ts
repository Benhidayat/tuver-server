import type { Bank } from "../../../generated/prisma/client.js";
import type { locales } from "../../locales/index.js";

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

export interface LocalType {
  noUrl: string,
  ipWarning: string,
  nestedUrlWarning: string,
  domainVerified: (bank: string) => string,
  domainNotVerified: string
};

export type Locale = keyof typeof locales