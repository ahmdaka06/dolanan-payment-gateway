import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class ProviderNotFoundException extends AppException {
    constructor(provider: string) {
        super(
            ERROR_CODE.PROVIDER_NOT_FOUND,
            `Payment provider "${provider}" not found`,
            HttpStatus.NOT_FOUND,
        );
    }
}
