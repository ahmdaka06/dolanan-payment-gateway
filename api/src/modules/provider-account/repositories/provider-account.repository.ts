import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderAccount } from '../entities/provider-account.entity';

@Injectable()
export class ProviderAccountRepository {
    constructor(
        @InjectRepository(ProviderAccount)
        private readonly accountRepo: Repository<ProviderAccount>,
    ) {}

    async findAll(): Promise<ProviderAccount[]> {
        return this.accountRepo.find({
            relations: { provider: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findByProvider(providerId: string): Promise<ProviderAccount[]> {
        return this.accountRepo.find({
            where: { providerId },
            relations: { provider: true },
        });
    }

    async findActiveByProvider(providerId: string): Promise<ProviderAccount | null> {
        return this.accountRepo.findOne({
            where: { providerId, isActive: true },
            relations: { provider: true },
        });
    }

    async findById(id: string): Promise<ProviderAccount | null> {
        return this.accountRepo.findOne({
            where: { id },
            relations: { provider: true },
        });
    }

    async create(data: Partial<ProviderAccount>): Promise<ProviderAccount> {
        const account = this.accountRepo.create(data);
        return this.accountRepo.save(account);
    }

    async save(account: ProviderAccount): Promise<ProviderAccount> {
        return this.accountRepo.save(account);
    }

    async remove(account: ProviderAccount): Promise<void> {
        await this.accountRepo.remove(account);
    }
}
