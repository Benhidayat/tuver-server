import { describe, expect, it } from 'vitest';
import { extractUrl } from '../helpers/verify.helper.js';

describe('extractUrl', () => {
    it('returns url from text message', () => {
        const message1 = "adedefwefe efewwe wefewfw gwgwe https://www.google.com"
        const message2 = "adedefwefe efewwe wefewfw gwgwe https://www.test.google.com"
        const message3 = "adedefwefe efewwe wefewfw gwgwe https://www.test.google.com/path/later"
        const message4 = "adedefwefe efewwe wefewfw gwgwe google.com"
        const message5 = "adedefwefe efewwe wefewfw gwgwe https://www.user@google.com"
        const message6 = "adedefwefe efewwe wefewfw gwgwe user/google.com"
        const message7 = "adedefwefe efewwe wefewfw gwgwe https://www.google.com1"



        expect(extractUrl(message1)).toBe('https://www.google.com');
        expect(extractUrl(message2)).toBe('https://www.test.google.com');
        expect(extractUrl(message3)).toBe('https://www.test.google.com/path/later');
        expect(extractUrl(message4)).toBe('google.com');
        expect(extractUrl(message5)).toBe('https://www.user@google.com');
        expect(extractUrl(message6)).toBe('google.com');
        expect(extractUrl(message7)).toBe('https://www.google.com');

    });
});