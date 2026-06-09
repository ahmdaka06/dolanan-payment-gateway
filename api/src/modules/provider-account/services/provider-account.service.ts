import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderAccountRepository } from '../repositories/provider-account.repository';
import { ProviderAccount } from '../entities/provider-account.entity';
import type { CreateProviderAccountData } from '../types/create-provider-account-data.type';
import type { UpdateProviderAccountData } from '../types/update-provider-account-data.type';
import type { PaginatedResult, PaginationOptions } from '../../../common/interfaces/pagination.type';

@Injectable()
export class ProviderAccountService {
    constructor(
        private readonly providerAccountRepository: ProviderAccountRepository,
    ) {}

    async findAll(
        options: PaginationOptions,
        providerId?: string,
    ): Promise<PaginatedResult<ProviderAccount>> {
        const page = options.page ?? 1;
        const pageSize = options.pageSize ?? 10;
        return this.providerAccountRepository.findPaginated(page, pageSize, providerId);
    }

    async findOne(id: string): Promise<ProviderAccount> {
        const account = await this.providerAccountRepository.findById(id);
        if (!account) {
            throw new NotFoundException(`ProviderAccount with ID ${id} not found`);
        }
        return account;
    }

    async findActive(providerId: string): Promise<ProviderAccount> {
        const account = await this.providerAccountRepository.findActiveByProvider(providerId);
        if (!account) {
            throw new NotFoundException(
                `No active account found for provider ${providerId}`,
            );
        }
        return account;
    }

    async create(data: CreateProviderAccountData): Promise<ProviderAccount> {
        return this.providerAccountRepository.create(data);
    }

    async update(id: string, data: UpdateProviderAccountData): Promise<ProviderAccount> {
        await this.findOne(id);
        return this.providerAccountRepository.update(id, data);
    }

    async toggleActive(id: string): Promise<ProviderAccount> {
        const account = await this.findOne(id);
        return this.providerAccountRepository.update(id, { isActive: !account.isActive });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.providerAccountRepository.delete(id);
    }
}
