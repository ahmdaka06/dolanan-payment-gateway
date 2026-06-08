import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "@/lib/auth";
import type { ApiResponse } from "@/lib/api/types";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

function getBackendBaseUrl() {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 400,
        message: "Username dan password wajib diisi.",
        errors: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(`${getBackendBaseUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });

  const payload = (await backendResponse.json().catch(() => null)) as
    | ApiResponse<AuthTokens>
    | null;

  if (!backendResponse.ok || !payload?.success) {
    return NextResponse.json(
      payload ?? {
        success: false,
        statusCode: backendResponse.status,
        message: backendResponse.statusText || "Login gagal.",
      },
      { status: backendResponse.status },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: payload.message ?? "Login success",
    timestamp: payload.timestamp,
  });

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    payload.data.accessToken,
    accessTokenCookieOptions,
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    payload.data.refreshToken,
    refreshTokenCookieOptions,
  );

  return response;
}
