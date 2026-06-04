import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentChannelRepository } from '../repositories/payment-channel.repository';

@Injectable()
export class PaymentChannelService {
    constructor(
        private readonly paymentChannelRepository: PaymentChannelRepository,
    ) { }
}
