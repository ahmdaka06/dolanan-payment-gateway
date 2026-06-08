export type ApiResponse<T = unknown> = {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationMeta;
};

export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  errorCode?: string;
  message: string;
  errors?: unknown[];
};
