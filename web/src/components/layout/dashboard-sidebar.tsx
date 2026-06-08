"use client";

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Network,
  ReceiptText,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dashboardNavigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/providers",
    label: "Providers",
    icon: Network,
  },
  {
    href: "/payment-channels",
    label: "Payment Channels",
    icon: ListChecks,
  },
  {
    href: "/create-payment",
    label: "Create Payment",
    icon: CreditCard,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: ReceiptText,
  },
];

type DashboardSidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapsed: () => void;
};

export function DashboardSidebar({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 border-r border-zinc-200 bg-white transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-950 lg:translate-x-0 lg:transition-[width]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed && "lg:w-20",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Link
            className={cn(
              "flex min-w-0 flex-1 items-center gap-3",
              isCollapsed && "lg:justify-center",
            )}
            href="/dashboard"
            onClick={onCloseMobile}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-400 dark:text-zinc-950">
              DP
            </span>
            <span className={cn("min-w-0", isCollapsed && "lg:hidden")}>
              <span className="block truncate text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                Dolanan
              </span>
              <span className="block truncate text-base font-semibold text-zinc-950 dark:text-zinc-50">
                Payment Gateway
              </span>
            </span>
          </Link>
          <Button
            aria-label="Close sidebar"
            className="lg:hidden"
            onClick={onCloseMobile}
            size="icon"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {dashboardNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                  isCollapsed && "lg:justify-center lg:px-0",
                )}
                href={item.href}
                key={item.href}
                onClick={onCloseMobile}
                title={item.label}
              >
                <Icon className="size-4 shrink-0" />
                <span className={cn("truncate", isCollapsed && "lg:hidden")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-zinc-200 p-3 dark:border-zinc-800 lg:block">
          <Button
            className={cn("w-full", isCollapsed && "px-0")}
            onClick={onToggleCollapsed}
            variant="secondary"
          >
            {isCollapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
            <span className={cn(isCollapsed && "lg:hidden")}>
              {isCollapsed ? "Expand" : "Collapse"}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
