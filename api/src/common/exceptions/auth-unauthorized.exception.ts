import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class AuthUnauthorizedException extends AppException {
    constructor(message?: string) {
        super(
            ERROR_CODE.AUTH_UNAUTHORIZED,
            message || 'Unauthorized',
            HttpStatus.UNAUTHORIZED,
        );
    }
}
