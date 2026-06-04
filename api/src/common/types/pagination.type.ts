export interface PaginationMeta {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
    items: T[];
    pagination: PaginationMeta;
}

export interface PaginationOptions {
    page?: number;
    pageSize?: number;
}
