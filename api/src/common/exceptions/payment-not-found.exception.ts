import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class PaymentNotFoundException extends AppException {
    constructor(invoiceNo: string) {
        super(
            ERROR_CODE.PAYMENT_NOT_FOUND,
            `Payment with invoice "${invoiceNo}" not found`,
            HttpStatus.NOT_FOUND,
        );
    }
}
