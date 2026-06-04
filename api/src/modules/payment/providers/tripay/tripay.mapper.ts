import { CreatePaymentData } from '../../types/create-payment-data.type';
import { CreatePaymentResult } from '../../types/create-payment-result.type';
import { ProviderRequest } from '../../types/provider-request.type';
import { ProviderResponse } from '../../types/provider-response.type';

export class TripayMapper {
    static toProviderRequest(data: CreatePaymentData): ProviderRequest {
        return {
            method: 'POST',
            endpoint: '/api/transaction/create',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                method: 'QRIS',
                merchant_ref: data.invoiceNo,
                amount: data.amount,
                order_items: [
                    {
                        name: data.description || 'Payment',
                        price: data.amount,
                        quantity: 1,
                    },
                ],
            },
        };
    }

    static toCreatePaymentResult(response: ProviderResponse): CreatePaymentResult {
        return {
            success: response.success,
            invoiceNo: response.data?.merchant_ref || '',
            providerReference: response.data?.reference,
            paymentUrl: response.data?.checkout_url,
            qrCode: response.data?.qr_string,
            instructions: response.data?.instructions,
            expiredAt: response.data?.expired_at
                ? new Date(response.data.expired_at)
                : undefined,
            rawResponse: response.raw,
        };
    }
}
