import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class UserNotFoundException extends AppException {
    constructor(identifier: string) {
        super(
            ERROR_CODE.USER_NOT_FOUND,
            `User with "${identifier}" not found`,
            HttpStatus.NOT_FOUND,
        );
    }
}
