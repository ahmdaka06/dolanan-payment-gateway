export type CreatePaymentChannelData = {
    providerId: string;
    code: string;
    name: string;
    feeFlat?: number;
    feePercent?: number;
};
