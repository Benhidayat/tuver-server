import type { Bank } from "../../../generated/prisma/client.js";

export type VerifyDomainResult = {
    verified: boolean,
    bank: Bank | null
}