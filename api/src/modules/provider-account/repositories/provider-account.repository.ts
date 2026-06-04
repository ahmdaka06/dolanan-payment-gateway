import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProviderAccount } from '../entities/provider-account.entity';

@Injectable()
export class ProviderAccountRepository extends Repository<ProviderAccount> {
    constructor(private dataSource: DataSource) {
        super(ProviderAccount, dataSource.createEntityManager());
    }

    async findByProvider(providerId: string): Promise<ProviderAccount[]> {
        return this.find({
            where: { providerId },
            relations: { provider: true },
        });
    }

    async findActiveByProvider(providerId: string): Promise<ProviderAccount | null> {
        return this.findOne({
            where: { providerId, isActive: true },
            relations: { provider: true },
        });
    }
}
