import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdatePaymentChannelDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    feeFlat?: number;

    @IsOptional()
    @IsNumber()
    feePercent?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
