"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Inbox, LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyTitle?: string;
  emptyDescription?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
  isLoading?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyTitle = "Data belum tersedia",
  emptyDescription = "Data akan muncul di tabel ini setelah sumber data terhubung.",
  enableSearch = false,
  enablePagination = false,
  isLoading = false,
  pageSize = 10,
  searchPlaceholder = "Cari data...",
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  // TanStack Table intentionally returns table helpers/functions that React Compiler flags.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const visibleColumns = table.getAllLeafColumns().length;
  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      {enableSearch ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <Input
              className="pl-9"
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder={searchPlaceholder}
              value={globalFilter}
            />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {rows.length} item
          </p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[720px] caption-bottom text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="h-56 px-4 text-center" colSpan={visibleColumns}>
                    <div className="flex flex-col items-center justify-center">
                      <LoaderCircle className="size-7 animate-spin text-emerald-600 dark:text-emerald-400" />
                      <p className="mt-3 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                        Memuat data
                      </p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Mohon tunggu sebentar.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((row) => (
                  <tr
                    className="border-b border-zinc-100 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/60"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="h-12 px-4 align-middle text-zinc-700 dark:text-zinc-300"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-64 px-4 text-center" colSpan={visibleColumns}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                        <Inbox className="size-5" />
                      </div>
                      <p className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {emptyTitle}
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {emptyDescription}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {enablePagination ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>Rows per page</span>
            <select
              className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
              onChange={(event) => {
                table.setPageSize(Number(event.target.value));
              }}
              value={table.getState().pagination.pageSize}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {Math.max(table.getPageCount(), 1)}
            </p>
            <div className="flex items-center gap-2">
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="sm"
                variant="secondary"
              >
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="sm"
                variant="secondary"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
