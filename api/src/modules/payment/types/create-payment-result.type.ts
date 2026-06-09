export type CreatePaymentResult = {
    success: boolean;
    invoiceNo: string;
    providerReference?: string;
    paymentUrl?: string;
    qrCode?: string;
    instructions?: string[];
    expiredAt?: Date;
    rawResponse?: any;
}
