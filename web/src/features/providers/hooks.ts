"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { ApiResponse, PaginatedResponse } from "@/lib/api/types";
import type {
  Provider,
  ProviderCreatePayload,
  ProviderUpdatePayload,
} from "@/features/providers/types";

type ProvidersResponse = Provider[] | PaginatedResponse<Provider>;
type ProviderMutationResponse = ApiResponse<Provider>;

const providersQueryKey = ["providers"] as const;

async function parseApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      payload?.message ??
        "Request gagal. Pastikan backend berjalan dan sesi masih valid.",
    );
  }

  return payload as ApiResponse<T>;
}

function normalizeProviders(payload: ProvidersResponse): Provider[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.items;
}

async function fetchProviders() {
  const response = await fetch("/api/providers", {
    cache: "no-store",
  });
  const payload = await parseApiResponse<ProvidersResponse>(response);

  return normalizeProviders(payload.data);
}

async function createProvider(data: ProviderCreatePayload) {
  const response = await fetch("/api/providers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseApiResponse<ProviderMutationResponse["data"]>(response);
}

async function updateProvider({
  id,
  data,
}: {
  id: string;
  data: ProviderUpdatePayload;
}) {
  const response = await fetch(`/api/providers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseApiResponse<ProviderMutationResponse["data"]>(response);
}

export function useProviders() {
  return useQuery({
    queryKey: providersQueryKey,
    queryFn: fetchProviders,
  });
}

export function useCreateProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProvider,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: providersQueryKey });
    },
  });
}

export function useUpdateProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProvider,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: providersQueryKey });
    },
  });
}
