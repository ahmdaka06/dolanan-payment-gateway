import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database/database.config';
import { throttlerConfig } from './config/redis/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProviderModule } from './modules/provider/provider.module';
import { ProviderAccountModule } from './modules/provider-account/provider-account.module';
import { PaymentChannelModule } from './modules/payment-channel/payment-channel.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { AuditModule } from './modules/audit/audit.module';
import { LoggerModule } from './shared/logger/logger.module';
import { HttpModule } from './shared/http/http.module';
import { RedisModule } from './shared/redis/redis.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RedisThrottlerStorage } from './shared/throttler/redis-throttler-storage';
import Redis from 'ioredis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot(databaseConfig),

        RedisModule,

        ThrottlerModule.forRootAsync({
            imports: [RedisModule],
            inject: ['REDIS_CLIENT'],
            useFactory: (redisClient: Redis) => {
                const { ttl, limit } = throttlerConfig();
                return {
                    throttlers: [{ ttl, limit }],
                    storage: new RedisThrottlerStorage(redisClient),
                };
            },
        }),

        LoggerModule,
        HttpModule,

        AuthModule,
        UserModule,
        ProviderModule,
        ProviderAccountModule,
        PaymentChannelModule,
        PaymentModule,
        TransactionModule,
        WebhookModule,
        AuditModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
