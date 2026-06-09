export type ApiResponse<T = any> = {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}

export type ApiErrorResponse = {
    success: boolean;
    statusCode: number;
    errorCode?: string;
    message: string;
    errors?: [];
}
