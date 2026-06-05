import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class CannotDeleteSelfException extends AppException {
    constructor() {
        super(
            ERROR_CODE.CANNOT_DELETE_SELF,
            'Cannot delete your own account',
            HttpStatus.FORBIDDEN,
        );
    }
}
