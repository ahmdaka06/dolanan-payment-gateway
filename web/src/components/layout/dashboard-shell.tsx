"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsCollapsed(
        window.localStorage.getItem("sidebar-collapsed") === "true",
      );
    });
  }, []);

  function toggleCollapsed() {
    setIsCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {isMobileOpen ? (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-zinc-950/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          type="button"
        />
      ) : null}

      <DashboardSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onToggleCollapsed={toggleCollapsed}
      />

      <div
        className={cn(
          "min-h-screen transition-[padding] duration-200 lg:pl-72",
          isCollapsed && "lg:pl-20",
        )}
      >
        <DashboardHeader onOpenMobile={() => setIsMobileOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
