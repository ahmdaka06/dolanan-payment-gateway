import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class PaymentFailedException extends AppException {
    constructor(message?: string) {
        super(
            ERROR_CODE.PAYMENT_CREATE_FAILED,
            message || 'Payment processing failed',
            HttpStatus.BAD_REQUEST,
        );
    }
}
