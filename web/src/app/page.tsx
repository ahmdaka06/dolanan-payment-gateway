import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-400 dark:text-zinc-950">
            DP
          </span>
          <span className="truncate font-semibold">Dolanan Payment Gateway</span>
        </Link>
        <ThemeToggle />
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center px-5 py-12 sm:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-emerald-400 dark:ring-zinc-800">
            <ShieldCheck className="size-7" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Admin Dashboard
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            Payment operations, ready for control.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Masuk ke dashboard untuk mengelola provider, payment channel,
            pembuatan payment, dan monitoring transaksi gateway.
          </p>
          <Link
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-zinc-950"
            href="/login"
          >
            Masuk ke Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
