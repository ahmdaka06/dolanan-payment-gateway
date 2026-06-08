import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/states";

export default function CreatePaymentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Buat payment baru melalui provider dan channel yang tersedia. Form request akan ditambahkan setelah kontrak endpoint siap."
        eyebrow="Payment"
        title="Create Payment"
      />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Payment Form Workspace
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Area siap untuk form invoice, nominal, customer, dan channel.
            </p>
          </div>
          <Badge variant="success">Form ready</Badge>
        </CardHeader>
        <CardContent>
          <EmptyState
            action={
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                <CreditCard className="size-4" />
                Create payment placeholder
              </div>
            }
            description="Belum ada integrasi endpoint payment. Form akan ditempatkan di area ini pada tahap berikutnya."
            title="Form belum dibuat"
          />
        </CardContent>
      </Card>
    </div>
  );
}
