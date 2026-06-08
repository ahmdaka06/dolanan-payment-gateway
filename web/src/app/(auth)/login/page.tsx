"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, LoaderCircle, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_440px] lg:px-10">
        <section className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm dark:bg-emerald-400 dark:text-zinc-950 lg:mx-0">
            <ShieldCheck className="size-7" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Admin Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Dolanan Payment Gateway
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 lg:max-w-lg">
            Panel operasional untuk mengelola provider, channel pembayaran,
            pembuatan payment, dan monitoring transaksi.
          </p>
        </section>

        <Card className="mx-auto w-full max-w-md p-6 sm:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
              Masuk
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Gunakan akun admin untuk mengakses dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  autoComplete="username"
                  className="pl-9"
                  id="username"
                  isInvalid={Boolean(errors.username)}
                  placeholder="admin"
                  {...register("username")}
                />
              </div>
              {errors.username ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.username.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  autoComplete="current-password"
                  className="pl-9"
                  id="password"
                  isInvalid={Boolean(errors.password)}
                  placeholder="Masukkan password"
                  type="password"
                  {...register("password")}
                />
              </div>
              {errors.password ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                {submitError}
              </div>
            ) : null}

            <Button className="h-11 w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {isSubmitting ? "Memproses..." : "Masuk ke Dashboard"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
