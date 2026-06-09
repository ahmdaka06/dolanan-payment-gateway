import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Environment } from '../../enums/environment.enum';

export class UpdateProviderAccountDto {
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
    @IsEnum(Environment)
    environment?: Environment;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
