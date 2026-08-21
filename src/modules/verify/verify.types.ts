import type { FinancialInstitution } from "../../../generated/prisma/client.js";
import type { locales } from "../../locales/index.js";

export type VerifyResult = 
    | {
        verified: true,
        bank: FinancialInstitution
      }
    | {
        verified: false,
        bank: null
      };

export interface MessageUrlDetail {
    domain: string | null,
    hasIp: boolean,
    subdomains: string[],
    hasNestedUrl: boolean,
    textWithoutUrl: string
};

export interface LocalType {
  noUrl: string,
  ipWarning: string,
  nestedUrlWarning: string,
  domainVerified: (bank: string) => string,
  domainNotVerified: string
};

export type Locale = keyof typeof locales