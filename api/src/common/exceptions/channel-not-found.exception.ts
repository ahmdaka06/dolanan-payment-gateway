import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class ChannelNotFoundException extends AppException {
    constructor(identifier: string) {
        super(
            ERROR_CODE.CHANNEL_NOT_FOUND,
            `Payment channel "${identifier}" not found`,
            HttpStatus.NOT_FOUND,
        );
    }
}
