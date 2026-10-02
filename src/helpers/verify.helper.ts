import { parse } from 'tldts';
import type { MessageUrlDetail } from "../modules/verify/verify.types.js";
import { findPhoneNumbersInText, type CountryCode } from 'libphonenumber-js';

const URL_PATTERN = /\b(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+(?:\.|@))+[a-zA-Z]{2,}(?:\/[^\s)]*)?/g;
const URL_TEST_PATTERN = /\b(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+(?:\.|@))+[a-zA-Z]{2,}(?:\/[^\s)]*)?/;
const IP_PATTERN = /\b(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}\b/;

export const extractUrls = (message: string): string[] => {
    return message.match(URL_PATTERN) ?? [];
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
            return URL_TEST_PATTERN.test(value);
        });
    } catch {
        return false;
    }
};

export const getMessageUrlDetail = (message: string, country: CountryCode): MessageUrlDetail => {

    const extractedUrls = extractUrls(message);
    const hasIp = hasIpAddress(message);
    const textWithoutUrl = extractedMessage(message);
    const numberFound = findPhoneNumbersInText(message, country);

    if (extractedUrls.length === 0) {
        return {
            parsedUrls: [],
            hasIp,
            hasNestedUrl: false,
            textWithoutUrl,
            numberFound
        }
    }

    // const parsedUrl = parse(extractedUrl);
    const parsedUrls = extractedUrls.map(url => {
        return parse(url);
    })
    const hasNestedUrl = extractedUrls.some(containUrlInQuery);

    return {
        parsedUrls: parsedUrls,
        hasIp,
        hasNestedUrl,
        textWithoutUrl,
        numberFound
    };
};