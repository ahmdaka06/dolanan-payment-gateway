import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateProviderDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
