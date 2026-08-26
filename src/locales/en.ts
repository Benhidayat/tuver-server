// import type { LocalType } from "../modules/verify/verify.types.js";

export const en = {
    noUrl: "No URL found in the message",
    ipWarning: "Warning: This message contains IP address instead of a url, which is uncommon for legitimate organizations. avoid this link.",
    domainVerified: (institution: string) =>
        `This message contains ${institution}'s official domain.`,
    noDomainNoAlias: "This domain could not be verified as an official domain",
    noDomainAliasFound: (institution: string) => 
        `This message contains a URL that is not an official ${institution} domain. Avoid this link`,
    nestedUrlWarning:
        "Warning: This link contains another URL in its parameters, which can hide the final destination. Avoid this link"
};