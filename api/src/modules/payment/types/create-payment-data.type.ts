export interface CreatePaymentData {
    amount: number;
    invoiceNo: string;
    providerId: string;
    paymentChannelId: string;
    description?: string;
    metadata?: Record<string, any>;
}
