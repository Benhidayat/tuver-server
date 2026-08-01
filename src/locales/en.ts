// import type { LocalType } from "../modules/verify/verify.types.js";

export const en = {
    noUrl: "No URL found in the message",
    ipWarning: "Warning: This message contains a link that uses an IP address instead of a domain. Legitimate organizations rarely send links like this. Proceed with caution.",
    domainVerified: (bank: string) =>
        `This domain is the official domain of ${bank}`,
    domainNotVerified: "This domain could not be verified as an official domain",
    nestedUrlWarning:
        "Warning: This link contains another URL within its parameters. While this is sometimes used for legitimate redirects, it can also be used to hide the final destination. Proceed with caution."
};