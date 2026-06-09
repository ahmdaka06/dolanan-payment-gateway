import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentChannel } from '../entities/payment-channel.entity';
import type { PaginatedResult } from '../../../common/interfaces/pagination.type';

@Injectable()
export class PaymentChannelRepository {
    constructor(
        @InjectRepository(PaymentChannel)
        private readonly channelRepo: Repository<PaymentChannel>,
    ) {}

    async findAll(): Promise<PaymentChannel[]> {
        return this.channelRepo.find({
            relations: { provider: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findPaginated(page: number, pageSize: number): Promise<PaginatedResult<PaymentChannel>> {
        const [items, totalItems] = await this.channelRepo.findAndCount({
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

    async findById(id: string): Promise<PaymentChannel | null> {
        return this.channelRepo.findOne({
            where: { id },
            relations: { provider: true },
        });
    }

    async findByCode(code: string): Promise<PaymentChannel | null> {
        return this.channelRepo.findOne({ where: { code } });
    }

    async findByProvider(providerId: string): Promise<PaymentChannel[]> {
        return this.channelRepo.find({
            where: { providerId },
            relations: { provider: true },
        });
    }

    async create(data: Partial<PaymentChannel>): Promise<PaymentChannel> {
        const channel = this.channelRepo.create(data);
        return this.channelRepo.save(channel);
    }

    async update(id: string, data: Partial<PaymentChannel>): Promise<PaymentChannel> {
        await this.channelRepo.update(id, data);
        return this.channelRepo.findOneByOrFail({ id });
    }

    async delete(id: string): Promise<void> {
        await this.channelRepo.delete(id);
    }
}
