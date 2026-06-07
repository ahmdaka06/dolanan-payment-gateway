import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

type PaymentChannelRow = {
  id: string;
  provider: string;
  code: string;
  name: string;
  status: string;
};

const paymentChannelColumns: ColumnDef<PaymentChannelRow>[] = [
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Channel",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const paymentChannelData: PaymentChannelRow[] = [];

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
          <DataTable
            columns={paymentChannelColumns}
            data={paymentChannelData}
            emptyDescription="Data channel belum dihubungkan. Response dari GET /payment-channels akan masuk ke tabel ini."
            emptyTitle="Channel belum tersedia"
            enablePagination
            enableSearch
            searchPlaceholder="Cari channel..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
