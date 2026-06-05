import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "@/lib/auth";

function getBackendBaseUrl() {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (accessToken && refreshToken) {
    await fetch(`${getBackendBaseUrl()}/auth/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => null);
  }

  const response = NextResponse.json({
    success: true,
    message: "Logout success",
  });

  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...accessTokenCookieOptions,
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...refreshTokenCookieOptions,
    maxAge: 0,
  });

  return response;
}
