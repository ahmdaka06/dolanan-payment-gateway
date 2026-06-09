export type WebhookData = {
    providerId: string;
    transactionId?: string;
    payload: any;
    signature?: string;
    ipAddress?: string;
}
