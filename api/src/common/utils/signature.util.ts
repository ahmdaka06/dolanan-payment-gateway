import * as crypto from 'crypto';

export function createSignature(payload: any, secret: string): string {
    const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('hex');
}

export function verifySignature(payload: any, signature: string, secret: string): boolean {
    const expected = createSignature(payload, secret);
    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature),
    );
}
