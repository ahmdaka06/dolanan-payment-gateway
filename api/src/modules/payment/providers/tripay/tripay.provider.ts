import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { TripayClient } from './tripay.client';
import { TripayMapper } from './tripay.mapper';

@Injectable()
export class TripayProvider implements IPaymentProvider {
    constructor(private readonly client: TripayClient) { }

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const request = TripayMapper.toProviderRequest(data);
        const response = await this.client.getClient().request({
            method: request.method,
            url: request.endpoint,
            data: request.body,
        });

        return TripayMapper.toCreatePaymentResult({
            success: response.data.success,
            statusCode: response.status,
            data: response.data,
            raw: response.data,
        });
    }

    async checkStatus(invoiceNo: string): Promise<CreatePaymentResult> {
        const response = await this.client.getClient().get(
            `/api/transaction/detail?merchant_ref=${invoiceNo}`,
        );

        return {
            success: response.data.success,
            invoiceNo,
            providerReference: response.data?.data?.reference,
            rawResponse: response.data,
        };
    }

    async processWebhook(payload: any): Promise<any> {
        return payload;
    }
}
