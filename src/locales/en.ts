// import type { LocalType } from "../modules/verify/verify.types.js";

export const en = {
    nothingToVerify: "No URL or phone number found in the message",
    ipWarning: "Warning: This message contains URL that uses IP address instead of domain name, which is uncommon for legitimate organizations. avoid this message and the link.",
    domainNotVerified: "This domain could not be verified as an official domain.",
    domainNotOfficial: (institution: string) => 
        `This message contains a URL that is not an official ${institution} domain. Avoid the link.`,
    phoneNotVerified: "This message contains phone number that could not be verified as an offical number.",
    phoneNotOfficial: (institution: string) => 
        `This message contains phone number that is not verified as an official ${institution} number. avoid contacting the number in the message message`,
    allVerified: (institution: string) =>
        ` All URLs and phone numbers in this message were verified as official ${institution} domains and phone numbers`,
    nestedUrlWarning:
        "Warning: This link contains another URL in its parameters, which can hide the final destination. Avoid this link"
};