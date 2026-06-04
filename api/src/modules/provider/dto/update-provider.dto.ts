import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateProviderDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    apiKey?: string;

    @IsOptional()
    @IsString()
    secretKey?: string;

    @IsOptional()
    @IsString()
    merchantCode?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
