import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export type SuccessResponse<T> = {
    status: boolean;
    message: string;
    data: T;
    timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, SuccessResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<SuccessResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                status: true,
                message: 'Success',
                data,
                timestamp: new Date().toISOString(),
            })),
        );
    }
}
