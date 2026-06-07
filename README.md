# Dolanan Payment Gateway

Admin Dashboard Payment Gateway dengan backend NestJS, PostgreSQL, Redis, dan frontend Next.js.

## Environment

Copy root environment untuk Docker dan backend API:

```bash
copy .env.example .env
```

Root `.env` dipakai oleh `docker-compose.yml`. Untuk development Docker, gunakan:

```env
DB_HOST=pgsql
REDIS_HOST=redis
APP_PORT=3001
APP_PREFIX=api/v1
```

Copy environment frontend lokal:

```bash
copy web\.env.example web\.env.local
```

Frontend lokal memakai:

```env
BACKEND_API_URL=http://localhost:3001/api/v1
```

File `.env` dan `web/.env.local` tidak ikut commit.

## Docker Services

Jalankan PostgreSQL dan Redis:

```bash
docker compose up -d pgsql redis
```

Jalankan API setelah database dan Redis healthy:

```bash
docker compose up -d --build api
```

Cek status dan log:

```bash
docker compose ps
docker compose logs -f api
```

API diekspos ke host pada:

```txt
http://localhost:3001
```

Dengan prefix backend:

```txt
http://localhost:3001/api/v1
```

## Frontend Web

Jalankan frontend secara lokal:

```bash
cd web
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:3000
```

## Current Backend Status

Auth endpoint sudah memiliki controller, tetapi login backend memakai field `email` dan `password`.

Providers frontend sudah tersedia dan aman saat backend belum siap. Namun backend `ProviderController` saat ini masih kosong, sehingga endpoint berikut belum benar-benar expose handler:

```txt
GET /api/v1/providers
POST /api/v1/providers
PUT /api/v1/providers/:id
```

Karena itu halaman frontend `/providers` dapat menampilkan error state sampai backend ProvidersController diimplementasikan.
