import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { PaydisiniClient } from './paydisini.client';
import { PaydisiniMapper } from './paydisini.mapper';

@Injectable()
export class PaydisiniProvider implements IPaymentProvider {
    constructor(private readonly client: PaydisiniClient) {}

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const request = PaydisiniMapper.toProviderRequest(data);
        const response = await this.client.getClient().request({
            method: request.method,
            url: request.endpoint,
            data: request.body,
        });

        return PaydisiniMapper.toCreatePaymentResult({
            success: true,
            statusCode: response.status,
            data: response.data,
            raw: response.data,
        });
    }

    async checkStatus(invoiceNo: string): Promise<CreatePaymentResult> {
        const response = await this.client.getClient().post(
            '/api/v1/transaction/status',
            {
                key: process.env.PAYDISINI_API_KEY,
                request: invoiceNo,
            },
        );

        return {
            success: true,
            invoiceNo,
            providerReference: response.data?.trx_id,
            rawResponse: response.data,
        };
    }

    async processWebhook(payload: any): Promise<any> {
        return payload;
    }
}
