import { ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/states";

export default function PaymentChannelsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Atur channel pembayaran yang tersedia untuk transaksi dan siapkan alur sinkronisasi channel dari provider."
        eyebrow="Channels"
        title="Payment Channels"
      />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Channel Directory
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Area siap untuk tabel channel, filter provider, dan tombol sync.
            </p>
          </div>
          <Badge variant="info">Sync ready</Badge>
        </CardHeader>
        <CardContent>
          <EmptyState
            action={
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <ListChecks className="size-4" />
                Payment channel placeholder
              </div>
            }
            description="Data channel belum dihubungkan. UI ini disiapkan untuk endpoint payment channels."
            title="Channel belum tersedia"
          />
        </CardContent>
      </Card>
    </div>
  );
}
