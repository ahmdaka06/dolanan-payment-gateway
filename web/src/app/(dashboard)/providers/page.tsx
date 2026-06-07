import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

type ProviderRow = {
  id: string;
  name: string;
  code: string;
  status: string;
};

const providerColumns: ColumnDef<ProviderRow>[] = [
  {
    accessorKey: "name",
    header: "Provider",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const providerData: ProviderRow[] = [];

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Kelola provider payment gateway seperti Tripay, Duitku, dan Paydisini. Tabel dan form konfigurasi akan ditambahkan pada tahap berikutnya."
        eyebrow="Configuration"
        title="Providers"
      />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Provider Management
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Layout siap untuk daftar provider, status aktif, dan aksi edit.
            </p>
          </div>
          <Badge variant="warning">Coming soon</Badge>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={providerColumns}
            data={providerData}
            emptyDescription="Belum ada integrasi endpoint provider pada frontend. Data dari GET /providers akan ditampilkan di tabel ini."
            emptyTitle="Provider belum dimuat"
            enablePagination
            enableSearch
            searchPlaceholder="Cari provider..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
