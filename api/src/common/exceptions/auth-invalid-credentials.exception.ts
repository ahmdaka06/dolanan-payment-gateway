import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class AuthInvalidCredentialsException extends AppException {
    constructor() {
        super(
            ERROR_CODE.AUTH_INVALID_CREDENTIALS,
            'Invalid credentials',
            HttpStatus.UNAUTHORIZED,
        );
    }
}
