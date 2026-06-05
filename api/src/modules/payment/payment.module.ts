import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentProviderFactory } from './factories/payment-provider.factory';
import { TripayClient } from './providers/tripay/tripay.client';
import { TripayProvider } from './providers/tripay/tripay.provider';
import { DuitkuClient } from './providers/duitku/duitku.client';
import { DuitkuProvider } from './providers/duitku/duitku.provider';
import { PaydisiniClient } from './providers/paydisini/paydisini.client';
import { PaydisiniProvider } from './providers/paydisini/paydisini.provider';
import { ProviderAccountModule } from '../provider-account/provider-account.module';
import { ProviderModule } from '../provider/provider.module';
import { AppConfigModule } from '../../config/app-config.module';

@Module({
    imports: [AppConfigModule, ProviderAccountModule, ProviderModule],
    controllers: [PaymentController],
    providers: [
        PaymentService,
        PaymentProviderFactory,
        TripayClient,
        {
            provide: 'TRIPAY_PROVIDER',
            useClass: TripayProvider,
        },
        DuitkuClient,
        {
            provide: 'DUITKU_PROVIDER',
            useClass: DuitkuProvider,
        },
        PaydisiniClient,
        {
            provide: 'PAYDISINI_PROVIDER',
            useClass: PaydisiniProvider,
        },
    ],
    exports: [PaymentProviderFactory],
})
export class PaymentModule {}
