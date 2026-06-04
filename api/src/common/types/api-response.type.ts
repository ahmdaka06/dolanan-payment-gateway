export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    errorCode?: string;
    message: string;
    errors?: [];
}
