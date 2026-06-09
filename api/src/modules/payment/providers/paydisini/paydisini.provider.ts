import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../types/payment-provider.type';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { PaydisiniClient } from './paydisini.client';
import { PaydisiniMapper } from './paydisini.mapper';
import { ProviderAccountService } from '../../../provider-account/services/provider-account.service';
import { ProviderService } from '../../../provider/services/provider.service';
import { ProviderCode } from '../../../../common/enums/provider-code.enum';

@Injectable()
export class PaydisiniProvider implements IPaymentProvider {
    constructor(
        private readonly client: PaydisiniClient,
        private readonly providerAccountService: ProviderAccountService,
        private readonly providerService: ProviderService,
    ) {}

    private async resolveApiKey(): Promise<string> {
        const provider = await this.providerService.findByCode(ProviderCode.PAYDISINI);
        const account = await this.providerAccountService.findActive(provider.id);
        return account.apiKey;
    }

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const apiKey = await this.resolveApiKey();
        const request = PaydisiniMapper.toProviderRequest(data, apiKey);
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
        const apiKey = await this.resolveApiKey();
        const response = await this.client.getClient().post(
            '/api/v1/transaction/status',
            {
                key: apiKey,
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
