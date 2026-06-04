import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PaymentChannel } from '../entities/payment-channel.entity';

@Injectable()
export class PaymentChannelRepository extends Repository<PaymentChannel> {
    constructor(private dataSource: DataSource) {
        super(PaymentChannel, dataSource.createEntityManager());
    }

    async findByCode(code: string): Promise<PaymentChannel | null> {
        return this.findOne({ where: { code } });
    }

    async findByProvider(providerId: string): Promise<PaymentChannel[]> {
        return this.find({ where: { providerId } });
    }
}
