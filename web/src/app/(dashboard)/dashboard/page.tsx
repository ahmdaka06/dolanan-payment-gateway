import { Activity, CreditCard, Network, ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";

const summaryCards = [
  {
    label: "Providers",
    value: "Ready",
    description: "Konfigurasi provider akan tampil di sini.",
    icon: Network,
  },
  {
    label: "Channels",
    value: "Sync",
    description: "Status channel akan tersedia setelah integrasi.",
    icon: CreditCard,
  },
  {
    label: "Transactions",
    value: "Monitor",
    description: "Ringkasan transaksi akan masuk ke area ini.",
    icon: ReceiptText,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Pantau kesehatan operasional payment gateway, performa provider, dan aktivitas transaksi dari satu tempat."
        eyebrow="Overview"
        title="Dashboard"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                    {item.value}
                  </h2>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Operational Snapshot
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Area ini disiapkan untuk chart, metrics, dan alert.
            </p>
          </div>
          <Badge variant="info">
            <Activity className="mr-1 size-3" />
            Coming soon
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            <LoadingState />
            <EmptyState
              description="Belum ada data dashboard karena integrasi backend modul belum dibuat."
              title="Data belum tersedia"
            />
            <ErrorState
              description="Komponen ini siap dipakai untuk error data fetching nanti."
              title="State error siap"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
