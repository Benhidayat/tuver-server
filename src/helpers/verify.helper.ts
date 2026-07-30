import { parse } from 'tldts';
import type { GetUrlDetailType } from "../modules/verify/verify.types.js";

const URL_PATTERN = /\b(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+(?:\.|@))+[a-zA-Z]{2,}(?:\/[^\s)]*)?/g;


const extractUrl = (message: string): string | null => {
    return message.match(URL_PATTERN)?.[0] ?? null;
};

export const getUrlDetail = (message: string): GetUrlDetailType=> {

    const extractedUrl = extractUrl(message);

    if (!extractedUrl) {
        return {
            domain: null,
            subdomains: [],

        }
    }

    const parsedUrl = parse(extractedUrl);

    return {
        domain: parsedUrl.domain,
        subdomains: parsedUrl.subdomain?.split('.') ?? [],
    };
};