import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookLog } from './entities/webhook-log.entity';
import { TripayWebhookController } from './controllers/tripay-webhook.controller';
import { DuitkuWebhookController } from './controllers/duitku-webhook.controller';
import { PaydisiniWebhookController } from './controllers/paydisini-webhook.controller';
import { WebhookService } from './services/webhook.service';
import { WebhookLogRepository } from './repositories/webhook-log.repository';

@Module({
    imports: [TypeOrmModule.forFeature([WebhookLog])],
    controllers: [
        TripayWebhookController,
        DuitkuWebhookController,
        PaydisiniWebhookController,
    ],
    providers: [WebhookService, WebhookLogRepository],
    exports: [WebhookService, WebhookLogRepository],
})
export class WebhookModule {}
