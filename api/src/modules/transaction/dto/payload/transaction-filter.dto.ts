import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TransactionStatus } from '../../../../common/enums/transaction-status.enum';

export class TransactionFilterDto {
    @IsOptional()
    @IsEnum(TransactionStatus)
    status?: TransactionStatus;

    @IsOptional()
    @IsString()
    startDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;
}
