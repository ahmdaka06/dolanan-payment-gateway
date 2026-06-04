import { IsString, IsOptional } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    code: string;

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
}
