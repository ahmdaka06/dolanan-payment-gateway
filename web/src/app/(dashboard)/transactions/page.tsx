import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

type TransactionRow = {
  id: string;
  invoiceNo: string;
  provider: string;
  amount: string;
  status: string;
  createdAt: string;
};

const transactionColumns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: "invoiceNo",
    header: "Invoice",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];

const transactionData: TransactionRow[] = [];

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
          <DataTable
            columns={transactionColumns}
            data={transactionData}
            emptyDescription="Belum ada request ke endpoint transaction. Response dari GET /transaction akan ditampilkan di tabel ini."
            emptyTitle="Transaksi belum dimuat"
            enablePagination
            enableSearch
            pageSize={10}
            searchPlaceholder="Cari transaksi..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
