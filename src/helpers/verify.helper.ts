import { parse } from 'tldts';
import type { MessageUrlDetail } from "../modules/verify/verify.types.js";

const URL_PATTERN = /\b(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+(?:\.|@))+[a-zA-Z]{2,}(?:\/[^\s)]*)?/;

const IP_PATTERN = /\b(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}\b/;

export const extractUrl = (message: string): string | null => {
    return message.match(URL_PATTERN)?.[0] ?? null;
};

const hasIpAddress = (message: string): boolean => {
    return IP_PATTERN.test(message);
};

const extractedMessage = (message: string) => message.replace(URL_PATTERN, '').trim();

export const normalizeTextAndAliases = (text: string): string => {
    return text.toLocaleLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, " ")
        .trim()
};

const containUrlInQuery = (url: string): boolean => {
    // make sure url has https schema
    const normalizedUrl = /^https?:\/\//.test(url)
        ? url
        : `https://${url}`;

    try {
        const parsed = new URL(normalizedUrl);

        return [...parsed.searchParams.values()].some(value => {
            try {
                value = decodeURIComponent(value);
            } catch {
                return false;
            }
            return URL_PATTERN.test(value);
        });
    } catch {
        return false;
    }
};

export const getMessageUrlDetail = (message: string): MessageUrlDetail => {

    const extractedUrl = extractUrl(message);
    const hasIp = hasIpAddress(message);
    const textWithoutUrl = extractedMessage(message);

    if (!extractedUrl) {
        return {
            domain: null,
            hasIp,
            subdomains: [],
            hasNestedUrl: false,
            textWithoutUrl,
        }
    }

    const parsedUrl = parse(extractedUrl);
    const hasNestedUrl = containUrlInQuery(extractedUrl);

    return {
        domain: parsedUrl.domain,
        hasIp,
        hasNestedUrl,
        subdomains: parsedUrl.subdomain?.split('.') ?? [],
        textWithoutUrl
    };
};