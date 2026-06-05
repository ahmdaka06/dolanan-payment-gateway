import { Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/states";

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
          <EmptyState
            action={
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <Network className="size-4" />
                Provider table placeholder
              </div>
            }
            description="Belum ada integrasi endpoint provider pada frontend. Komponen tabel dapat ditempatkan di area ini."
            title="Provider belum dimuat"
          />
        </CardContent>
      </Card>
    </div>
  );
}
