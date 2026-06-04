import { CreatePaymentData } from '../types/create-payment-data.type';
import { CreatePaymentResult } from '../types/create-payment-result.type';

export interface IPaymentProvider {
    createPayment(data: CreatePaymentData): Promise<CreatePaymentResult>;
    checkStatus(invoiceNo: string): Promise<CreatePaymentResult>;
    processWebhook(payload: any): Promise<any>;
}
