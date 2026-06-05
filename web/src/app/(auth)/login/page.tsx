"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, LoaderCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi."),
  password: z.string().min(1, "Password wajib diisi."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginErrorResponse = {
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmitError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as
        | LoginErrorResponse
        | null;

      if (!response.ok) {
        setSubmitError(
          payload?.message ??
            "Login gagal. Pastikan backend berjalan dan kredensial benar.",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setSubmitError(
        "Tidak dapat terhubung ke server. Pastikan backend dan frontend berjalan.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
          <section className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Admin Dashboard
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              Dolanan Payment Gateway
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              Kelola provider, channel pembayaran, dan transaksi dari satu
              panel operasional yang ringkas.
            </p>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-semibold tracking-normal">
                Masuk
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Gunakan akun admin untuk mengakses dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-zinc-800"
                  htmlFor="username"
                >
                  Username
                </label>
                <div
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md border bg-white px-3 transition-colors",
                    errors.username
                      ? "border-red-400"
                      : "border-zinc-300 focus-within:border-emerald-600",
                  )}
                >
                  <User className="size-4 shrink-0 text-zinc-500" />
                  <input
                    id="username"
                    autoComplete="username"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    placeholder="admin"
                    {...register("username")}
                  />
                </div>
                {errors.username ? (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-zinc-800"
                  htmlFor="password"
                >
                  Password
                </label>
                <div
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md border bg-white px-3 transition-colors",
                    errors.password
                      ? "border-red-400"
                      : "border-zinc-300 focus-within:border-emerald-600",
                  )}
                >
                  <LockKeyhole className="size-4 shrink-0 text-zinc-500" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    placeholder="Masukkan password"
                    {...register("password")}
                  />
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              {submitError ? (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {submitError}
                </div>
              ) : null}

              <button
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Memproses..." : "Masuk ke Dashboard"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
