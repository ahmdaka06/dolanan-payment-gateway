import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';
import { ProviderCode } from '../../../common/enums/provider-code.enum';

@Injectable()
export class ProviderRepository {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepo: Repository<Provider>,
    ) {}

    async findAll(): Promise<Provider[]> {
        return this.providerRepo.find({ order: { createdAt: 'DESC' } });
    }

    async findById(id: string): Promise<Provider | null> {
        return this.providerRepo.findOneBy({ id });
    }

    async findByCode(code: ProviderCode): Promise<Provider | null> {
        return this.providerRepo.findOneBy({ code });
    }

    async create(data: Partial<Provider>): Promise<Provider> {
        const provider = this.providerRepo.create(data);
        return this.providerRepo.save(provider);
    }

    async update(id: string, data: Partial<Provider>): Promise<Provider> {
        await this.providerRepo.update(id, data);
        return this.providerRepo.findOneByOrFail({ id });
    }

    async delete(id: string): Promise<void> {
        await this.providerRepo.delete(id);
    }
}
