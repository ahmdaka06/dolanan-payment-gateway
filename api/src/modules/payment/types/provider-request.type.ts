export interface ProviderRequest {
    method: string;
    endpoint: string;
    headers: Record<string, string>;
    body?: any;
    queryParams?: Record<string, string>;
}
