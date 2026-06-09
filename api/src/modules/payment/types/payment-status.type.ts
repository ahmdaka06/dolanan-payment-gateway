export type PaymentStatus = {
    invoiceNo: string;
    status: string;
    amount: number;
    providerReference?: string;
    paidAt?: Date;
    expiredAt?: Date;
}
