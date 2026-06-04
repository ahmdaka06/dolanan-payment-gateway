import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { ProviderRequest } from '../../types/provider-request.type';
import { ProviderResponse } from '../../types/provider-response.type';

export class PaydisiniMapper {
    static toProviderRequest(data: CreatePaymentData): ProviderRequest {
        return {
            method: 'POST',
            endpoint: '/api/v1/transaction/create',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                key: process.env.PAYDISINI_API_KEY,
                request: data.invoiceNo,
                amount: data.amount,
                description: data.description || 'Payment',
                type: 'single',
            },
        };
    }

    static toCreatePaymentResult(response: ProviderResponse): CreatePaymentResult {
        return {
            success: response.success,
            invoiceNo: response.data?.request || '',
            providerReference: response.data?.trx_id,
            paymentUrl: response.data?.payment_url,
            qrCode: response.data?.qr_code,
            rawResponse: response.raw,
        };
    }
}
