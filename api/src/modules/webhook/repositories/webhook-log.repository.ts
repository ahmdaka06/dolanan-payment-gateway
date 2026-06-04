import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WebhookLog } from '../entities/webhook-log.entity';

@Injectable()
export class WebhookLogRepository extends Repository<WebhookLog> {
    constructor(private dataSource: DataSource) {
        super(WebhookLog, dataSource.createEntityManager());
    }

    async findByTransactionId(transactionId: string): Promise<WebhookLog[]> {
        return this.find({ where: { transactionId } });
    }

    async findByProviderId(providerId: string): Promise<WebhookLog[]> {
        return this.find({ where: { providerId } });
    }
}
