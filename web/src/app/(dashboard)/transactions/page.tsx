import { ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/states";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Pantau transaksi, status pembayaran, invoice, dan referensi provider dalam satu halaman monitoring."
        eyebrow="Monitoring"
        title="Transactions"
      />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Transaction Monitor
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Area siap untuk tabel transaksi, filter status, dan pagination.
            </p>
          </div>
          <Badge variant="neutral">Table ready</Badge>
        </CardHeader>
        <CardContent>
          <EmptyState
            action={
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <ReceiptText className="size-4" />
                Transaction table placeholder
              </div>
            }
            description="Belum ada request ke endpoint transaction. Tabel monitoring akan ditempatkan di area ini."
            title="Transaksi belum dimuat"
          />
        </CardContent>
      </Card>
    </div>
  );
}
