import { IsString } from 'class-validator';

export class TransactionDetailDto {
    @IsString()
    invoiceNo: string;
}
