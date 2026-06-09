import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentChannelRepository } from '../repositories/payment-channel.repository';
import { PaymentChannel } from '../entities/payment-channel.entity';
import type { CreatePaymentChannelData } from '../types/create-payment-channel-data.type';
import type { UpdatePaymentChannelData } from '../types/update-payment-channel-data.type';

@Injectable()
export class PaymentChannelService {
    constructor(
        private readonly paymentChannelRepository: PaymentChannelRepository,
    ) {}

    async findAll(): Promise<PaymentChannel[]> {
        return this.paymentChannelRepository.findAll();
    }

    async findOne(id: string): Promise<PaymentChannel> {
        const channel = await this.paymentChannelRepository.findById(id);
        if (!channel) {
            throw new NotFoundException(`PaymentChannel with ID ${id} not found`);
        }
        return channel;
    }

    async create(data: CreatePaymentChannelData): Promise<PaymentChannel> {
        return this.paymentChannelRepository.create(data);
    }

    async update(id: string, data: UpdatePaymentChannelData): Promise<PaymentChannel> {
        await this.findOne(id);
        return this.paymentChannelRepository.update(id, data);
    }

    async toggleActive(id: string): Promise<PaymentChannel> {
        const channel = await this.findOne(id);
        return this.paymentChannelRepository.update(id, { isActive: !channel.isActive });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.paymentChannelRepository.delete(id);
    }
}
