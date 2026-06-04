import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProviderModule } from './modules/provider/provider.module';
import { PaymentChannelModule } from './modules/payment-channel/payment-channel.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { AuditModule } from './modules/audit/audit.module';
import { LoggerModule } from './shared/logger/logger.module';
import { HttpModule } from './shared/http/http.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot(databaseConfig),

        LoggerModule,
        HttpModule,

        AuthModule,
        UserModule,
        ProviderModule,
        PaymentChannelModule,
        PaymentModule,
        TransactionModule,
        WebhookModule,
        AuditModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
