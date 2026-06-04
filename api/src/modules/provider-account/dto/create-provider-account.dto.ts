import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class CreateProviderAccountDto {
    @IsString()
    providerId: string;

    @IsString()
    name: string;

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
}
