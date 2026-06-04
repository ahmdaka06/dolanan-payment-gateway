export const PAYMENT_PROVIDERS = {
    TRIPAY: 'tripay',
    DUITKU: 'duitku',
    PAYDISINI: 'paydisini',
} as const;

export const PAYMENT_METHODS = {
    VIRTUAL_ACCOUNT: 'virtual_account',
    QRIS: 'qris',
    CONVENIENCE_STORE: 'convenience_store',
    BANK_TRANSFER: 'bank_transfer',
} as const;

export const CURRENCY = {
    IDR: 'IDR',
} as const;

export const MAX_REFUND_DAYS = 30;
