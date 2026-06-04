import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { ProviderRequest } from '../../types/provider-request.type';
import { ProviderResponse } from '../../types/provider-response.type';

export class DuitkuMapper {
    static toProviderRequest(data: CreatePaymentData): ProviderRequest {
        return {
            method: 'POST',
            endpoint: '/api/merchant/transaction/create',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                merchantCode: process.env.DUITKU_MERCHANT_CODE,
                paymentAmount: data.amount,
                merchantOrderId: data.invoiceNo,
                productDetails: data.description || 'Payment',
                paymentMethod: 'VC',
            },
        };
    }

    static toCreatePaymentResult(response: ProviderResponse): CreatePaymentResult {
        return {
            success: response.success,
            invoiceNo: response.data?.merchantOrderId || '',
            providerReference: response.data?.reference,
            paymentUrl: response.data?.paymentUrl,
            instructions: response.data?.instruction,
            rawResponse: response.raw,
        };
    }
}
