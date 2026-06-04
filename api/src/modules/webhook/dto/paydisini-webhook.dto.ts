import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PaydisiniWebhookDto {
    @IsString()
    providerId: string;

    @IsString()
    trx_id: string;

    @IsString()
    request: string;

    @IsString()
    status: string;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    signature?: string;
}
