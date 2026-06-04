import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentChannel } from './entities/payment-channel.entity';
import { PaymentChannelController } from './controllers/payment-channel.controller';
import { PaymentChannelService } from './services/payment-channel.service';
import { PaymentChannelRepository } from './repositories/payment-channel.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentChannel])],
    controllers: [PaymentChannelController],
    providers: [PaymentChannelService, PaymentChannelRepository],
    exports: [PaymentChannelService, PaymentChannelRepository],
})
export class PaymentChannelModule {}
