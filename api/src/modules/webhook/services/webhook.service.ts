import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebhookLogRepository } from '../repositories/webhook-log.repository';

@Injectable()
export class WebhookService {
    constructor(
        private readonly webhookLogRepository: WebhookLogRepository,
    ) {}

    async process(providerId: string, payload: any, signature?: string, ipAddress?: string) {
        await this.webhookLogRepository.save({
            providerId,
            signature,
            ipAddress,
            payload,
        });

        return { received: true };
    }
}
