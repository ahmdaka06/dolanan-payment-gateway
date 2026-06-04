import { IsString, IsOptional, IsObject } from 'class-validator';

export class TripayWebhookDto {
    @IsString()
    providerId: string;

    @IsString()
    reference: string;

    @IsString()
    merchant_ref: string;

    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    signature?: string;

    @IsOptional()
    @IsObject()
    metadata?: any;
}
