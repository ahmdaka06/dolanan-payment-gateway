import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderAccount } from '../entities/provider-account.entity';
import type { PaginatedResult } from '../../../common/interfaces/pagination.type';

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

    async findPaginated(
        page: number,
        pageSize: number,
        providerId?: string,
    ): Promise<PaginatedResult<ProviderAccount>> {
        const where = providerId ? { providerId } : {};
        const [items, totalItems] = await this.accountRepo.findAndCount({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: { provider: true },
            order: { createdAt: 'DESC' },
        });

        return {
            items,
            meta: {
                page,
                pageSize,
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                hasNextPage: page * pageSize < totalItems,
                hasPreviousPage: page > 1,
            },
        };
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

    async update(id: string, data: Partial<ProviderAccount>): Promise<ProviderAccount> {
        await this.accountRepo.update(id, data);
        return this.accountRepo.findOneByOrFail({ id });
    }

    async delete(id: string): Promise<void> {
        await this.accountRepo.delete(id);
    }
}
