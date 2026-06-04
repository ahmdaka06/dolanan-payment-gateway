import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppException } from '../exceptions/app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        let httpStatus: number;
        let errorCode: string | undefined;
        let message: string;
        let errors: any[] | undefined;

        if (exception instanceof AppException) {
            const response = exception.getResponse() as Record<string, any>;

            httpStatus = exception.getStatus();
            errorCode = exception.errorCode;
            message = response.message || exception.message;
            errors = response.errors;
        } else if (exception instanceof HttpException) {
            const response = exception.getResponse();

            httpStatus = exception.getStatus();
            message = typeof response === 'string' ? response : (response as any).message;
        } else {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            errorCode = ERROR_CODE.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
        }

        const responseBody = {
            success: false,
            statusCode: httpStatus,
            errorCode,
            message,
            errors,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
