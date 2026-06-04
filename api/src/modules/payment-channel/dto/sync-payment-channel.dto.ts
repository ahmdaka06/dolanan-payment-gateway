import { IsString } from 'class-validator';

export class SyncPaymentChannelDto {
    @IsString()
    providerCode: string;
}
