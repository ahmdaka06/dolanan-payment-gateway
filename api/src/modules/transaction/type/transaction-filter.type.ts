import { TransactionStatus } from '../../../common/enums/transaction-status.enum';

export type TransactionFilter = {
    status?: TransactionStatus;
    startDate?: Date;
    endDate?: Date;
    providerId?: string;
}
