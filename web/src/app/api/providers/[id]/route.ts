import { NextResponse } from "next/server";
import { backendRequest } from "@/lib/api/server";
import { apiRouteError } from "@/lib/api/route";
import type { Provider, ProviderUpdatePayload } from "@/features/providers/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as ProviderUpdatePayload;
    const response = await backendRequest<Provider>(
      `/providers/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body,
      },
    );

    return NextResponse.json(response);
  } catch (error) {
    return apiRouteError(error);
  }
}
