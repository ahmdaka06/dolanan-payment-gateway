import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { createDatabaseOptions } from './config/database/database.config';
import { throttlerConfig } from './config/throttler/throttler.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
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
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    AppConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => createDatabaseOptions(config),
    }),

    RedisModule,

    ThrottlerModule.forRootAsync({
      imports: [RedisModule, AppConfigModule],
      inject: ['REDIS_CLIENT', AppConfigService],
      useFactory: (redisClient: Redis, config: AppConfigService) => {
        const { ttl, limit } = throttlerConfig(config);
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
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
