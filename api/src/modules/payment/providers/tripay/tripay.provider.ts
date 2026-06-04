import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { TripayClient } from './tripay.client';
import { TripayMapper } from './tripay.mapper';
import { ProviderAccountService } from '../../../provider-account/services/provider-account.service';
import { ProviderService } from '../../../provider/services/provider.service';
import { ProviderCode } from '../../../../common/enums/provider-code.enum';

@Injectable()
export class TripayProvider implements IPaymentProvider {
    constructor(
        private readonly client: TripayClient,
        private readonly providerAccountService: ProviderAccountService,
        private readonly providerService: ProviderService,
    ) {}

    private async resolveApiKey(): Promise<string> {
        const provider = await this.providerService.findByCode(ProviderCode.TRIPAY);
        const account = await this.providerAccountService.findActive(provider.id);
        return account.apiKey;
    }

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const apiKey = await this.resolveApiKey();
        const request = TripayMapper.toProviderRequest(data);
        const response = await this.client.getClient(apiKey).request({
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
        const apiKey = await this.resolveApiKey();
        const response = await this.client.getClient(apiKey).get(
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
