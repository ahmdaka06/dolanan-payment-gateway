export const ACCESS_TOKEN_COOKIE = "dolanan_access_token";
export const REFRESH_TOKEN_COOKIE = "dolanan_refresh_token";

const isProduction = process.env.NODE_ENV === "production";

export const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  path: "/",
  maxAge: 60 * 15,
} as const;

export const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
} as const;
