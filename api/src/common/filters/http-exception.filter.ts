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

            if (typeof response === 'object' && response !== null) {
                const body = response as Record<string, any>;
                
                if (Array.isArray(body.message)) {
                    errors = body.message;
                    message = 'Validation failed';
                } else {
                    message = body.message || exception.message;
                }
            } else {
                message = response as string;
            }

            if (httpStatus === HttpStatus.TOO_MANY_REQUESTS) {
                errorCode = ERROR_CODE.TOO_MANY_REQUESTS;
                message = 'Too many requests';
            }
            const DEFAULT_ERROR_CODES: Record<number, string> = {
                [HttpStatus.TOO_MANY_REQUESTS]: ERROR_CODE.TOO_MANY_REQUESTS,
                [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
                [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
                [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
            };
            errorCode = DEFAULT_ERROR_CODES[httpStatus];
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
