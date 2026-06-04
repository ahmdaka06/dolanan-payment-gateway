import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class ProviderInactiveException extends AppException {
    constructor(provider: string) {
        super(
            ERROR_CODE.PROVIDER_INACTIVE,
            `Payment provider "${provider}" is inactive`,
            HttpStatus.BAD_REQUEST,
        );
    }
}
