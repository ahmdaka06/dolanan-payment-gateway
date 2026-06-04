import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProviderLog } from '../entities/provider-log.entity';

@Injectable()
export class ProviderLogRepository extends Repository<ProviderLog> {
    constructor(private dataSource: DataSource) {
        super(ProviderLog, dataSource.createEntityManager());
    }

    async findByProviderId(providerId: string): Promise<ProviderLog[]> {
        return this.find({ where: { providerId } });
    }
}
