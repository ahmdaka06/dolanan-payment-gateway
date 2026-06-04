import { IsString, IsNumber, IsOptional } from 'class-validator';

export class DuitkuWebhookDto {
    @IsString()
    providerId: string;

    @IsString()
    merchantOrderId: string;

    @IsString()
    reference: string;

    @IsString()
    statusCode: string;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    signature?: string;
}
