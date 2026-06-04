import * as crypto from 'crypto';

export function randomString(length: number = 16): string {
    return crypto.randomBytes(length).toString('hex');
}

export function randomNumeric(length: number = 6): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += crypto.randomInt(0, 10).toString();
    }
    return result;
}

export function randomAlphanumeric(length: number = 12): string {
    return crypto
        .randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, length);
}
