import { IsOptional, IsString } from 'class-validator';

export class ProviderLogFilterDto {
    @IsOptional()
    @IsString()
    providerId?: string;

    @IsOptional()
    @IsString()
    endpoint?: string;

    @IsOptional()
    @IsString()
    startDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;
}
