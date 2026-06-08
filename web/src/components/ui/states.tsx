import type { ReactNode } from "react";
import { AlertTriangle, Inbox, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type StateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: StateProps) {
  return (
    <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <Inbox className="size-5" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}

export function LoadingState({
  title = "Memuat data",
  description = "Mohon tunggu sebentar.",
}: Partial<StateProps>) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
      <LoaderCircle className="size-7 animate-spin text-emerald-600 dark:text-emerald-400" />
      <h2 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </Card>
  );
}

export function ErrorState({
  title = "Terjadi kendala",
  description = "Silakan coba lagi beberapa saat.",
  action,
}: Partial<StateProps>) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        <AlertTriangle className="size-5" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {action ? (
        <div className="mt-5">{action}</div>
      ) : (
        <Button className="mt-5" variant="secondary">
          Coba lagi
        </Button>
      )}
    </Card>
  );
}
