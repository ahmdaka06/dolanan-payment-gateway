import { IsString, IsOptional } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    code: string;

    @IsString()
    name: string;
}
