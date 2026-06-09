import { Injectable, Inject } from '@nestjs/common';
import { ProviderCode } from '../../../common/enums/provider-code.enum';
import type { IPaymentProvider } from '../types/payment-provider.type';

@Injectable()
export class PaymentProviderFactory {
    constructor(
        @Inject('TRIPAY_PROVIDER')
        private readonly tripayProvider: IPaymentProvider,
        @Inject('DUITKU_PROVIDER')
        private readonly duitkuProvider: IPaymentProvider,
        @Inject('PAYDISINI_PROVIDER')
        private readonly paydisiniProvider: IPaymentProvider,
    ) {}

    getProvider(provider: ProviderCode): IPaymentProvider {
        switch (provider) {
            case ProviderCode.TRIPAY:
                return this.tripayProvider;
            case ProviderCode.DUITKU:
                return this.duitkuProvider;
            case ProviderCode.PAYDISINI:
                return this.paydisiniProvider;
            default:
                throw new Error(`Unsupported payment provider: ${provider}`);
        }
    }
}
