# Frontend Guide

Dokumen ini menjelaskan frontend Admin Dashboard Payment Gateway yang berada di folder `web`.

## Overview

Frontend dibangun sebagai admin dashboard untuk mengelola payment gateway. Saat ini UI dasar, auth flow, dashboard shell, reusable components, dan modul Providers frontend sudah tersedia.

Backend memiliki dokumentasi terpisah di `API.md`.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zod + React Hook Form untuk validasi form
- TanStack Query untuk server state
- TanStack Table untuk table
- Lucide React untuk icon
- Sonner untuk toast

## Struktur Folder Penting

```txt
web/src/app
  (auth)/login
  (dashboard)
  api/auth
  api/providers

web/src/components
  layout
  ui

web/src/features
  providers

web/src/lib
  api
  auth.ts
  utils.ts

web/src/providers
  query-provider.tsx
```

## Environment Frontend

Buat file local env frontend:

```bash
copy web\.env.example web\.env.local
```

Isi utama:

```env
BACKEND_API_URL=http://localhost:3001/api/v1
```

`BACKEND_API_URL` hanya dipakai server-side oleh Next Route Handler. Jangan gunakan `NEXT_PUBLIC` untuk base URL backend yang menangani auth/token.

## Menjalankan Frontend

```bash
cd web
npm install
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:3000
```

## Build dan Lint

```bash
npm run lint
npm run build
```

Jika build Turbopack mengalami OOM di environment lokal:

```bash
npm run build -- --webpack
```

## Auth Flow

Auth frontend memakai Next Route Handler dan `httpOnly cookie`.

Alur login:

1. Client submit login ke `/api/auth/login`.
2. Route handler Next meneruskan request ke backend `POST /auth/login`.
3. Backend mengembalikan token.
4. Route handler menyimpan `accessToken` dan `refreshToken` ke `httpOnly cookie`.
5. Client tidak menyimpan token di `localStorage`.

Logout:

1. Client request ke `/api/auth/logout`.
2. Route handler memanggil backend logout jika token tersedia.
3. Cookie auth dihapus.
4. User diarahkan kembali ke `/login`.

## Route Frontend

Route yang sudah tersedia:

```txt
/
/login
/dashboard
/providers
/payment-channels
/create-payment
/transactions
```

Route dashboard berada dalam protected dashboard shell. Jika cookie access token tidak ada, user diarahkan ke `/login`.

## API Proxy Route

Route handler frontend yang sudah tersedia:

```txt
/api/auth/login
/api/auth/logout
/api/providers
/api/providers/[id]
```

Proxy route menggunakan helper server-side untuk meneruskan request ke backend dengan token dari cookie.

## Reusable Components

Komponen UI ringan yang sudah tersedia:

- `Button`
- `Input`
- `Card`
- `Badge`
- `PageHeader`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `DataTable`
- `ThemeToggle`

Komponen layout:

- `DashboardShell`
- `DashboardSidebar`
- `DashboardHeader`

Dashboard sudah mendukung dark mode, responsive sidebar, mobile drawer, dan desktop sidebar collapse.

## Modul Providers

Modul Providers frontend sudah tersedia di:

```txt
web/src/features/providers
```

Fitur frontend yang sudah ada:

- UI table Providers
- Form tambah provider
- Form edit provider
- Toggle aktif/nonaktif provider
- Fetch/mutation dengan TanStack Query
- Table dengan TanStack Table
- Validasi form dengan Zod + React Hook Form
- Loading state
- Empty state
- Error state

Jika backend belum tersedia atau endpoint gagal, halaman `/providers` akan menampilkan error state dan tidak crash.

## Known Limitations

- Backend `ProviderController` masih kosong.
- Endpoint berikut belum bisa dites real dari backend:

```txt
GET /api/v1/providers
POST /api/v1/providers
PUT /api/v1/providers/:id
```

- Seed admin backend belum jelas apakah berjalan otomatis atau harus manual.
- Login backend saat ini memakai field `email` dan `password`, sedangkan beberapa dokumentasi lama mungkin masih menyebut `username`.

## Next Development Plan

Rencana pengembangan frontend berikutnya:

1. Payment Channels
2. Create Payment
3. Transactions
4. Dashboard summary

Jangan lanjutkan integrasi modul tersebut sebelum endpoint backend terkait siap atau kontrak response sudah final.
