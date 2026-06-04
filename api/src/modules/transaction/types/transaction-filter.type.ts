import { TransactionStatus } from '../../../common/enums/transaction-status.enum';

export interface TransactionFilter {
    status?: TransactionStatus;
    startDate?: Date;
    endDate?: Date;
    providerId?: string;
}
