import { NextResponse } from "next/server";
import { backendRequest } from "@/lib/api/server";
import { apiRouteError } from "@/lib/api/route";
import type { Provider, ProviderCreatePayload } from "@/features/providers/types";

export async function GET() {
  try {
    const response = await backendRequest<Provider[]>("/providers");
    return NextResponse.json(response);
  } catch (error) {
    return apiRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProviderCreatePayload;
    const response = await backendRequest<Provider>("/providers", {
      method: "POST",
      body,
    });

    return NextResponse.json(response);
  } catch (error) {
    return apiRouteError(error);
  }
}
