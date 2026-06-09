import { IsString } from 'class-validator';

export class PaymentChannelListDto {
    @IsString()
    providerId: string;
}
