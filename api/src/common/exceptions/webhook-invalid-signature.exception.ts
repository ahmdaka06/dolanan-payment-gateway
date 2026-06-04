import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class WebhookInvalidSignatureException extends AppException {
    constructor(provider?: string) {
        super(
            ERROR_CODE.WEBHOOK_INVALID_SIGNATURE,
            provider
                ? `Invalid webhook signature for provider "${provider}"`
                : 'Invalid webhook signature',
            HttpStatus.UNAUTHORIZED,
        );
    }
}
