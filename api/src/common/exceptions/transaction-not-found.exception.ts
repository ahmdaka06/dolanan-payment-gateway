import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class TransactionNotFoundException extends AppException {
    constructor(referenceId: string) {
        super(
            ERROR_CODE.TRANSACTION_NOT_FOUND,
            `Transaction "${referenceId}" not found`,
            HttpStatus.NOT_FOUND,
        );
    }
}
