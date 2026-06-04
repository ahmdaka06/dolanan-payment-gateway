import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { DuitkuClient } from './duitku.client';
import { DuitkuMapper } from './duitku.mapper';

@Injectable()
export class DuitkuProvider implements IPaymentProvider {
    constructor(private readonly client: DuitkuClient) {}

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const request = DuitkuMapper.toProviderRequest(data);
        const response = await this.client.getClient().request({
            method: request.method,
            url: request.endpoint,
            data: request.body,
        });

        return DuitkuMapper.toCreatePaymentResult({
            success: true,
            statusCode: response.status,
            data: response.data,
            raw: response.data,
        });
    }

    async checkStatus(invoiceNo: string): Promise<CreatePaymentResult> {
        const response = await this.client.getClient().post(
            '/api/merchant/transaction/status',
            {
                merchantOrderId: invoiceNo,
            },
        );

        return {
            success: true,
            invoiceNo,
            providerReference: response.data?.reference,
            rawResponse: response.data,
        };
    }

    async processWebhook(payload: any): Promise<any> {
        return payload;
    }
}
