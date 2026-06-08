import { NextResponse } from "next/server";
import { BackendApiError } from "@/lib/api/server";

export function apiRouteError(error: unknown) {
  if (error instanceof BackendApiError) {
    return NextResponse.json(
      {
        success: false,
        statusCode: error.statusCode,
        errorCode: error.errorCode,
        message: error.message,
        errors: error.errors ?? [],
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 502,
        message:
          error.message === "BACKEND_API_URL is not configured."
            ? error.message
            : "Tidak dapat terhubung ke backend API.",
        errors: [],
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan saat memproses request.",
      errors: [],
    },
    { status: 500 },
  );
}
