import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderRepository } from '../repositories/provider.repository';
import { Provider } from '../entities/provider.entity';
import { ProviderCode } from '../../../common/enums/provider-code.enum';
import type { CreateProviderData } from '../types/create-provider-data.type';
import type { UpdateProviderData } from '../types/update-provider-data.type';

@Injectable()
export class ProviderService {
    constructor(
        private readonly providerRepository: ProviderRepository,
    ) {}

    async findAll(): Promise<Provider[]> {
        return this.providerRepository.findAll();
    }

    async findOne(id: string): Promise<Provider> {
        const provider = await this.providerRepository.findById(id);
        if (!provider) {
            throw new NotFoundException(`Provider with ID ${id} not found`);
        }
        return provider;
    }

    async findByCode(code: ProviderCode): Promise<Provider> {
        const provider = await this.providerRepository.findByCode(code);
        if (!provider) {
            throw new NotFoundException(`Provider with code ${code} not found`);
        }
        return provider;
    }

    async create(data: CreateProviderData): Promise<Provider> {
        return this.providerRepository.create(data);
    }

    async update(id: string, data: UpdateProviderData): Promise<Provider> {
        await this.findOne(id);
        return this.providerRepository.update(id, data);
    }

    async toggleActive(id: string): Promise<Provider> {
        const provider = await this.findOne(id);
        return this.providerRepository.update(id, { isActive: !provider.isActive });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.providerRepository.delete(id);
    }
}
