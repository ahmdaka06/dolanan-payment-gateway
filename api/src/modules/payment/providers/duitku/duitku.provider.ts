import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../types/payment-provider.type';
import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { DuitkuClient } from './duitku.client';
import { DuitkuMapper } from './duitku.mapper';
import { ProviderAccountService } from '../../../provider-account/services/provider-account.service';
import { ProviderService } from '../../../provider/services/provider.service';
import { ProviderCode } from '../../../../common/enums/provider-code.enum';

@Injectable()
export class DuitkuProvider implements IPaymentProvider {
    constructor(
        private readonly client: DuitkuClient,
        private readonly providerAccountService: ProviderAccountService,
        private readonly providerService: ProviderService,
    ) {}

    private async resolveMerchantCode(): Promise<string> {
        const provider = await this.providerService.findByCode(ProviderCode.DUITKU);
        const account = await this.providerAccountService.findActive(provider.id);
        return account.merchantCode;
    }

    async createPayment(data: CreatePaymentData): Promise<CreatePaymentResult> {
        const merchantCode = await this.resolveMerchantCode();
        const request = DuitkuMapper.toProviderRequest(data, merchantCode);
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
