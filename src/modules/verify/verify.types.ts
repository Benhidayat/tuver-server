import type { locales } from "../../locales/index.js";
import { parse } from 'tldts';
import { type NumberFound } from "libphonenumber-js";
import { findDomain } from "./verify.repository.js";


// custom return type based on findDomain query
export type FinancialInstitutionWithDetails = 
  NonNullable<Awaited<ReturnType<typeof findDomain>>>

export type VerifyResult = 
    | {
        verified: true,
        bank: FinancialInstitutionWithDetails
      }
    | {
        verified: false,
        bank: null
      };

// make the parse return type to available
type IResult = ReturnType<typeof parse>

export interface MessageUrlDetail {
    parsedUrls: IResult[],
    hasIp: boolean,
    hasNestedUrl: boolean,
    textWithoutUrl: string,
    numberFound: NumberFound[]
};

export interface LocalType {
  noUrl: string,
  ipWarning: string,
  nestedUrlWarning: string,
  domainVerified: (bank: string) => string,
  domainNotVerified: string
};

export type Locale = keyof typeof locales