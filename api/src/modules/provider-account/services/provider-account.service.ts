import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderAccountRepository } from '../repositories/provider-account.repository';
import { CreateProviderAccountDto } from '../dto/create-provider-account.dto';
import { UpdateProviderAccountDto } from '../dto/update-provider-account.dto';
import { ProviderAccount } from '../entities/provider-account.entity';

@Injectable()
export class ProviderAccountService {
    constructor(
        private readonly providerAccountRepository: ProviderAccountRepository,
    ) {}

    async create(dto: CreateProviderAccountDto): Promise<ProviderAccount> {
        const account = this.providerAccountRepository.create(dto);
        return this.providerAccountRepository.save(account);
    }

    async findAll(providerId: string): Promise<ProviderAccount[]> {
        return this.providerAccountRepository.findByProvider(providerId);
    }

    async findOne(id: string): Promise<ProviderAccount> {
        const account = await this.providerAccountRepository.findOne({
            where: { id },
            relations: { provider: true },
        });
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

    async update(id: string, dto: UpdateProviderAccountDto): Promise<ProviderAccount> {
        const account = await this.findOne(id);
        Object.assign(account, dto);
        return this.providerAccountRepository.save(account);
    }

    async remove(id: string): Promise<void> {
        const account = await this.findOne(id);
        await this.providerAccountRepository.remove(account);
    }
}
