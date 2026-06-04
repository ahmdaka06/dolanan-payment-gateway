import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
    public readonly errorCode: string;

    constructor(
        errorCode: string,
        message: string,
        httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
        errors?: any[],
    ) {
        const body: Record<string, any> = {
            errorCode,
            message,
        };

        if (errors?.length) {
            body.errors = errors;
        }

        super(body, httpStatus);
        this.errorCode = errorCode;
    }
}
