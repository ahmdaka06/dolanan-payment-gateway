export type PaginationMeta = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type PaginatedResult<T> = {
    items: T[];
    meta: PaginationMeta;
}

export type PaginationOptions = {
    page?: number;
    pageSize?: number;
}
