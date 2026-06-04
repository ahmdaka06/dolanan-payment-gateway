import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class ChannelInactiveException extends AppException {
    constructor(channel: string) {
        super(
            ERROR_CODE.CHANNEL_INACTIVE,
            `Payment channel "${channel}" is inactive`,
            HttpStatus.BAD_REQUEST,
        );
    }
}
