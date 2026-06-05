"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/providers": "Providers",
  "/payment-channels": "Payment Channels",
  "/create-payment": "Create Payment",
  "/transactions": "Transactions",
};

export function DashboardHeader({ onOpenMobile }: { onOpenMobile: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const title = pageTitles[pathname] ?? "Dashboard";

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      toast.error("Logout gagal diproses, sesi lokal tetap akan dihapus.");
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            aria-label="Open navigation"
            className="lg:hidden"
            onClick={onOpenMobile}
            size="icon"
            variant="secondary"
          >
            <Menu className="size-4" />
          </Button>
          <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
            Admin Dashboard
          </p>
          <h1 className="truncate text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {title}
          </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
          disabled={isLoggingOut}
          onClick={handleLogout}
            variant="secondary"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">
            {isLoggingOut ? "Keluar..." : "Logout"}
          </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
