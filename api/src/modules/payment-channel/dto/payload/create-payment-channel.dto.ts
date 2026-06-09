import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreatePaymentChannelDto {
    @IsString()
    providerId: string;

    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    feeFlat?: number;

    @IsOptional()
    @IsNumber()
    feePercent?: number;
}
