import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth";
import type { ApiErrorResponse, ApiResponse } from "@/lib/api/types";

type BackendRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
};

export class BackendApiError extends Error {
  statusCode: number;
  errorCode?: string;
  errors?: unknown[];

  constructor(error: ApiErrorResponse) {
    super(error.message);
    this.name = "BackendApiError";
    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
    this.errors = error.errors;
  }
}

function getBackendBaseUrl() {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new BackendApiError(
      payload ?? {
        success: false,
        statusCode: response.status,
        message: response.statusText || "Backend request failed",
      },
    );
  }

  return payload as ApiResponse<T>;
}
