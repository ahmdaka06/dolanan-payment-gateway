import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    providerId: string;

    @IsString()
    paymentChannelId: string;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}
