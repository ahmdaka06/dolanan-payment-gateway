"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, LoaderCircle, Plus, RefreshCw, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState } from "@/components/ui/states";
import {
  useCreateProvider,
  useProviders,
  useUpdateProvider,
} from "@/features/providers/hooks";
import type { Provider } from "@/features/providers/types";

const providerSchema = z.object({
  name: z.string().min(2, "Nama provider minimal 2 karakter."),
  code: z.string().min(2, "Code provider wajib diisi."),
  isActive: z.boolean(),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

type FormMode =
  | {
      type: "create";
    }
  | {
      type: "edit";
      provider: Provider;
    };

function getProviderStatus(provider: Provider) {
  if (typeof provider.isActive === "boolean") {
    return provider.isActive;
  }

  return provider.status?.toLowerCase() === "active";
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return format(date, "dd MMM yyyy");
}

function ProviderForm({
  mode,
  onCancel,
  onSuccess,
}: {
  mode: FormMode;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const createProvider = useCreateProvider();
  const updateProvider = useUpdateProvider();
  const isEdit = mode.type === "edit";
  const provider = isEdit ? mode.provider : undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: provider?.name ?? "",
      code: provider?.code ?? "",
      isActive: provider ? getProviderStatus(provider) : true,
    },
  });
  const isSubmitting = createProvider.isPending || updateProvider.isPending;

  async function onSubmit(values: ProviderFormValues) {
    try {
      if (isEdit && provider) {
        await updateProvider.mutateAsync({
          id: provider.id,
          data: {
            name: values.name,
            isActive: values.isActive,
          },
        });
        toast.success("Provider berhasil diperbarui.");
      } else {
        await createProvider.mutateAsync({
          name: values.name,
          code: values.code.trim().toUpperCase(),
        });
        toast.success("Provider berhasil ditambahkan.");
      }

      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Provider gagal disimpan. Coba lagi.",
      );
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {isEdit ? "Edit Provider" : "Tambah Provider"}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {isEdit
              ? "Perbarui nama dan status aktif provider."
              : "Tambahkan provider baru menggunakan code dari backend."}
          </p>
        </div>
        <Button onClick={onCancel} size="icon" variant="ghost">
          <X className="size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 lg:grid-cols-[1fr_220px_160px_auto]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              htmlFor="provider-name"
            >
              Name
            </label>
            <Input
              id="provider-name"
              isInvalid={Boolean(errors.name)}
              placeholder="Tripay"
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              htmlFor="provider-code"
            >
              Code
            </label>
            <Input
              className="uppercase"
              disabled={isEdit}
              id="provider-code"
              isInvalid={Boolean(errors.code)}
              placeholder="TRIPAY"
              {...register("code")}
            />
            {errors.code ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.code.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              htmlFor="provider-active"
            >
              Status
            </label>
            <label className="flex h-10 items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <input
                className="size-4 accent-emerald-600"
                id="provider-active"
                type="checkbox"
                {...register("isActive")}
              />
              Active
            </label>
          </div>

          <div className="flex items-end gap-2">
            <Button className="w-full lg:w-auto" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : null}
              {isEdit ? "Simpan" : "Tambah"}
            </Button>
            <Button
              className="w-full lg:w-auto"
              onClick={onCancel}
              type="button"
              variant="secondary"
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProvidersPage() {
  const [formMode, setFormMode] = useState<FormMode | null>(null);
  const providersQuery = useProviders();
  const updateProvider = useUpdateProvider();
  const providers = providersQuery.data ?? [];
  const columns = useMemo<ColumnDef<Provider>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-zinc-950 dark:text-zinc-50">
              {row.original.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {row.original.id}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => (
          <span className="font-mono text-xs font-medium uppercase">
            {row.original.code}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const isActive = getProviderStatus(row.original);

          return (
            <Badge variant={isActive ? "success" : "neutral"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const provider = row.original;
          const isActive = getProviderStatus(provider);
          const isUpdating = updateProvider.isPending;

          return (
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => setFormMode({ type: "edit", provider })}
                size="sm"
                variant="secondary"
              >
                <Edit className="size-4" />
                Edit
              </Button>
              <Button
                disabled={isUpdating}
                onClick={async () => {
                  try {
                    await updateProvider.mutateAsync({
                      id: provider.id,
                      data: {
                        isActive: !isActive,
                      },
                    });
                    toast.success(
                      `Provider ${!isActive ? "diaktifkan" : "dinonaktifkan"}.`,
                    );
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "Status provider gagal diperbarui.",
                    );
                  }
                }}
                size="sm"
                variant={isActive ? "danger" : "secondary"}
              >
                {isActive ? "Nonaktifkan" : "Aktifkan"}
              </Button>
            </div>
          );
        },
      },
    ],
    [updateProvider],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        action={
          <Button onClick={() => setFormMode({ type: "create" })}>
            <Plus className="size-4" />
            Tambah Provider
          </Button>
        }
        description="Kelola provider payment gateway seperti Tripay, Duitku, dan Paydisini."
        eyebrow="Configuration"
        title="Providers"
      />

      {formMode ? (
        <ProviderForm
          mode={formMode}
          onCancel={() => setFormMode(null)}
          onSuccess={() => setFormMode(null)}
        />
      ) : null}

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Provider Management
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Daftar provider, status aktif, dan aksi update konfigurasi.
            </p>
          </div>
          <Badge variant="info">GET /providers</Badge>
        </CardHeader>
        <CardContent>
          {providersQuery.isError ? (
            <ErrorState
              action={
                <Button onClick={() => void providersQuery.refetch()} variant="secondary">
                  <RefreshCw className="size-4" />
                  Coba lagi
                </Button>
              }
              description={
                providersQuery.error instanceof Error
                  ? providersQuery.error.message
                  : "Tidak dapat memuat provider. Pastikan backend berjalan dan sesi login masih valid."
              }
              title="Provider gagal dimuat"
            />
          ) : (
            <DataTable
              columns={columns}
              data={providers}
              emptyDescription="Belum ada provider dari backend. Gunakan tombol Tambah Provider untuk membuat konfigurasi pertama."
              emptyTitle="Provider belum tersedia"
              enablePagination
              enableSearch
              isLoading={providersQuery.isLoading}
              searchPlaceholder="Cari provider..."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
