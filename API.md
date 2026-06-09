# Payment Gateway Aggregator API

## Base URL

```http
http://localhost:3000/api/v1
```

---

## Authentication

Gunakan JWT Bearer Token. Token diperoleh dari endpoint login atau refresh.

```http
Authorization: Bearer <token>
```

---

## Standard Response

### Success

```typescript
type ApiResponse<T = any> = {
    status: boolean;
    data: T;
    message: string;
    timestamp: string;
}
```

Contoh:

```json
{
    "status": true,
    "message": "Success",
    "data": {},
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

### Pagination

```typescript
type PaginationMeta = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

type PaginatedResult<T> = {
    items: T[];
    meta: PaginationMeta;
}
```

Contoh paginated response:

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "items": [],
        "meta": {
            "page": 1,
            "pageSize": 10,
            "totalItems": 100,
            "totalPages": 10,
            "hasNextPage": true,
            "hasPreviousPage": false
        }
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

### Error

```typescript
type ApiErrorResponse = {
    status: boolean;
    statusCode: number;
    errorCode?: string;
    message: string;
    errors?: [];
}
```

Contoh:

```json
{
    "status": false,
    "statusCode": 404,
    "errorCode": "PROVIDER_NOT_FOUND",
    "message": "Provider tidak ditemukan",
    "errors": []
}
```

---

## Auth

### Login

Public endpoint. Mengembalikan access token dan refresh token.

#### Request

```http
POST /api/v1/auth/login
```

```json
{
    "username": "admin",
    "password": "secret"
}
```

| Field      | Type   | Required | Description        |
| ---------- | ------ | -------- | ------------------ |
| `username` | string | Yes      | Username pengguna  |
| `password` | string | Yes      | Password pengguna  |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Login success",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIs...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field          | Type   | Description                |
| -------------- | ------ | -------------------------- |
| `accessToken`  | string | JWT access token (1d)      |
| `refreshToken` | string | JWT refresh token (7d)     |

**401 Unauthorized**

```json
{
    "status": false,
    "statusCode": 401,
    "errorCode": "AUTH_INVALID_CREDENTIALS",
    "message": "Username atau password salah",
    "errors": []
}
```

---

### Refresh Token

Public endpoint. Mendapatkan access token baru menggunakan refresh token.

#### Request

```http
POST /api/v1/auth/refresh
```

```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

| Field          | Type   | Required | Description        |
| -------------- | ------ | -------- | ------------------ |
| `refreshToken` | string | Yes      | Refresh token aktif |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Token refreshed",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIs...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field          | Type   | Description                    |
| -------------- | ------ | ------------------------------ |
| `accessToken`  | string | JWT access token baru (1d)     |
| `refreshToken` | string | JWT refresh token baru (7d)    |

**401 Unauthorized**

```json
{
    "status": false,
    "statusCode": 401,
    "errorCode": "AUTH_UNAUTHORIZED",
    "message": "Refresh token tidak valid atau sudah expired",
    "errors": []
}
```

---

### Logout

Memerlukan Bearer token. Menghapus refresh token agar tidak dapat digunakan kembali.

#### Request

```http
DELETE /api/v1/auth/logout
```

```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

| Field          | Type   | Required | Description               |
| -------------- | ------ | -------- | ------------------------- |
| `refreshToken` | string | Yes      | Refresh token yang aktif  |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Logout success",
    "data": null,
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

## Users

Semua endpoint user memerlukan Bearer token.

### Get Users

#### Request

```http
GET /api/v1/user?page=1&pageSize=10
```

Query parameters:

| Parameter  | Type   | Required | Default | Description             |
| ---------- | ------ | -------- | ------- | ----------------------- |
| `page`     | number | No       | 1       | Halaman                 |
| `pageSize` | number | No       | 10      | Jumlah item per halaman |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "items": [
            {
                "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                "username": "admin",
                "createdAt": "2026-01-01T00:00:00.000Z",
                "updatedAt": "2026-01-01T00:00:00.000Z"
            }
        ],
        "meta": {
            "page": 1,
            "pageSize": 10,
            "totalItems": 1,
            "totalPages": 1,
            "hasNextPage": false,
            "hasPreviousPage": false
        }
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field       | Type   | Description          |
| ----------- | ------ | -------------------- |
| `id`        | string | UUID user            |
| `username`  | string | Username pengguna    |
| `createdAt` | string | Tanggal dibuat (ISO) |
| `updatedAt` | string | Tanggal update (ISO) |

---

### Create User

#### Request

```http
POST /api/v1/user
```

```json
{
    "username": "operator",
    "password": "rahasia123"
}
```

| Field      | Type   | Required | Min Length | Description       |
| ---------- | ------ | -------- | ---------- | ----------------- |
| `username` | string | Yes      | 3          | Username pengguna |
| `password` | string | Yes      | 6          | Password pengguna |

#### Response

**201 Created**

```json
{
    "status": true,
    "message": "User created",
    "data": {
        "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "username": "operator"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

## Providers

Semua endpoint provider memerlukan Bearer token.

### Get Providers

#### Request

```http
GET /api/v1/providers
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
            "code": "tripay",
            "name": "Tripay",
            "isActive": true,
            "createdAt": "2026-01-01T00:00:00.000Z"
        }
    ],
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field      | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| `id`       | string  | UUID provider                                     |
| `code`     | string  | Kode provider (`tripay`, `duitku`, `paydisini`)   |
| `name`     | string  | Nama provider                                     |
| `isActive` | boolean | Status aktif/nonaktif                             |
| `createdAt`| string  | Tanggal dibuat (ISO)                              |

---

### Create Provider

#### Request

```http
POST /api/v1/providers
```

```json
{
    "code": "tripay",
    "name": "Tripay",
    "apiKey": "xxxx",
    "secretKey": "xxxx",
    "merchantCode": "T123"
}
```

| Field          | Type   | Required | Description                  |
| -------------- | ------ | -------- | ---------------------------- |
| `code`         | string | Yes      | Kode unik provider           |
| `name`         | string | Yes      | Nama provider                |
| `apiKey`       | string | No       | API key provider             |
| `secretKey`    | string | No       | Secret key provider          |
| `merchantCode` | string | No       | Kode merchant dari provider  |

#### Response

**201 Created**

```json
{
    "status": true,
    "message": "Provider created",
    "data": {
        "id": "p1r2o3v4-i5d6-e7r8-9012-345678901234"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Update Provider

#### Request

```http
PATCH /api/v1/providers/{id}
```

Path parameters:

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | Yes      | UUID provider |

```json
{
    "name": "Tripay Updated",
    "apiKey": "yyyy",
    "isActive": false
}
```

| Field      | Type    | Required | Description         |
| ---------- | ------- | -------- | ------------------- |
| `name`     | string  | No       | Nama provider       |
| `apiKey`   | string  | No       | API key provider    |
| `secretKey`| string  | No       | Secret key provider |
| `isActive` | boolean | No       | Status provider     |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Provider updated",
    "data": {
        "id": "p1r2o3v4-i5d6-e7r8-9012-345678901234"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Toggle Active Provider

#### Request

```http
PATCH /api/v1/providers/{id}/toggle-active
```

Path parameters:

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | Yes      | UUID provider |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Provider active status toggled",
    "data": {
        "id": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
        "isActive": false
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Delete Provider

#### Request

```http
DELETE /api/v1/providers/{id}
```

Path parameters:

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `id`      | string | Yes      | UUID provider |

#### Response

**204 No Content**

---

## Payment Channels

Semua endpoint payment channel memerlukan Bearer token.

### Get Channels

#### Request

```http
GET /api/v1/payment-channels
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "id": "c1h2a3n4-n5e6-l7s8-9012-345678901234",
            "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
            "code": "QRIS",
            "name": "QRIS",
            "feeFlat": 1000,
            "feePercent": 0.5,
            "isActive": true,
            "createdAt": "2026-01-01T00:00:00.000Z"
        }
    ],
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field        | Type    | Description                    |
| ------------ | ------- | ------------------------------ |
| `id`         | string  | UUID channel                   |
| `providerId` | string  | UUID provider terkait          |
| `code`       | string  | Kode channel                   |
| `name`       | string  | Nama channel                   |
| `feeFlat`    | number  | Biaya admin flat (IDR)         |
| `feePercent` | number  | Biaya admin persentase (%)     |
| `isActive`   | boolean | Status channel                 |
| `createdAt`  | string  | Tanggal dibuat (ISO)           |

---

### Create Channel

#### Request

```http
POST /api/v1/payment-channels
```

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "code": "QRIS",
    "name": "QRIS",
    "feeFlat": 1000,
    "feePercent": 0.5
}
```

| Field        | Type   | Required | Description                |
| ------------ | ------ | -------- | -------------------------- |
| `providerId` | string | Yes      | UUID provider              |
| `code`       | string | Yes      | Kode channel               |
| `name`       | string | Yes      | Nama channel               |
| `feeFlat`    | number | No       | Biaya admin flat (IDR)     |
| `feePercent` | number | No       | Biaya admin persentase (%) |

#### Response

**201 Created**

```json
{
    "status": true,
    "message": "Payment channel created",
    "data": {
        "id": "c1h2a3n4-n5e6-l7s8-9012-345678901234"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Sync Channels

Sinkronisasi daftar channel pembayaran dari provider. Data channel akan diambil dari API provider dan disimpan ke database lokal.

#### Request

```http
POST /api/v1/payment-channels/sync
```

```json
{
    "providerCode": "tripay"
}
```

| Field          | Type   | Required | Description                                   |
| -------------- | ------ | -------- | --------------------------------------------- |
| `providerCode` | string | Yes      | Kode provider (`tripay`, `duitku`, `paydisini`) |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Channels synced",
    "data": null,
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Update Channel

#### Request

```http
PATCH /api/v1/payment-channels/{id}
```

Path parameters:

| Parameter | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| `id`      | string | Yes      | UUID channel   |

```json
{
    "name": "QRIS Updated",
    "feeFlat": 1500,
    "isActive": false
}
```

| Field        | Type    | Required | Description                |
| ------------ | ------- | -------- | -------------------------- |
| `name`       | string  | No       | Nama channel               |
| `code`       | string  | No       | Kode channel               |
| `providerId` | string  | No       | UUID provider              |
| `feeFlat`    | number  | No       | Biaya admin flat (IDR)     |
| `feePercent` | number  | No       | Biaya admin persentase (%) |
| `isActive`   | boolean | No       | Status channel             |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Payment channel updated",
    "data": {
        "id": "c1h2a3n4-n5e6-l7s8-9012-345678901234"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Toggle Active Channel

#### Request

```http
PATCH /api/v1/payment-channels/{id}/toggle-active
```

Path parameters:

| Parameter | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| `id`      | string | Yes      | UUID channel   |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Active status toggled",
    "data": {
        "id": "c1h2a3n4-n5e6-l7s8-9012-345678901234",
        "isActive": false
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Delete Channel

#### Request

```http
DELETE /api/v1/payment-channels/{id}
```

Path parameters:

| Parameter | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| `id`      | string | Yes      | UUID channel   |

#### Response

**204 No Content**

---

## Payments

### Get Available Channels

Memerlukan Bearer token. Mengembalikan daftar channel pembayaran yang tersedia untuk digunakan.

#### Request

```http
GET /api/v1/payment/channels
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
            "providerCode": "tripay",
            "paymentChannelId": "c1h2a3n4-n5e6-l7s8-9012-345678901234",
            "channelCode": "QRIS",
            "channelName": "QRIS",
            "feeFlat": 1000,
            "feePercent": 0.5
        }
    ],
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Create Payment

Memerlukan Bearer token. Membuat transaksi pembayaran baru melalui provider yang dipilih.

#### Request

```http
POST /api/v1/payment
```

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "paymentChannelId": "c1h2a3n4-n5e6-l7s8-9012-345678901234",
    "amount": 10000,
    "description": "Top up saldo"
}
```

| Field              | Type   | Required | Description          |
| ------------------ | ------ | -------- | -------------------- |
| `providerId`       | string | Yes      | UUID provider        |
| `paymentChannelId` | string | Yes      | UUID channel         |
| `amount`           | number | Yes      | Nominal pembayaran   |
| `description`      | string | No       | Deskripsi transaksi  |

#### Response

**201 Created**

```json
{
    "status": true,
    "message": "Payment created",
    "data": {
        "invoiceNo": "INV-20260605-0001",
        "reference": "TRX123456",
        "amount": 10000,
        "fee": 1000,
        "totalAmount": 11000,
        "paymentUrl": "https://checkout.tripay.co.id/checkout/xxx",
        "status": "pending",
        "expiredAt": "2026-06-06T10:00:00.000Z"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field         | Type   | Description                      |
| ------------- | ------ | -------------------------------- |
| `invoiceNo`   | string | Nomor invoice unik               |
| `reference`   | string | Reference dari provider          |
| `amount`      | number | Nominal pembayaran (IDR)         |
| `fee`         | number | Biaya admin (IDR)                |
| `totalAmount` | number | Total yang harus dibayar (IDR)   |
| `paymentUrl`  | string | URL halaman checkout provider    |
| `status`      | string | Status transaksi                 |
| `expiredAt`   | string | Waktu kadaluarsa pembayaran (ISO)|

---

### Get Payment Status

Memerlukan Bearer token. Mengecek status pembayaran berdasarkan nomor invoice.

#### Request

```http
GET /api/v1/payment/{invoiceNo}
```

Path parameters:

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `invoiceNo` | string | Yes      | Nomor invoice        |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "invoiceNo": "INV-20260605-0001",
        "reference": "TRX123456",
        "status": "paid",
        "amount": 10000,
        "fee": 1000,
        "totalAmount": 11000,
        "paidAt": "2026-06-05T12:00:00.000Z"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field         | Type    | Description                      |
| ------------- | ------- | -------------------------------- |
| `invoiceNo`   | string  | Nomor invoice                    |
| `reference`   | string  | Reference dari provider          |
| `status`      | string  | Status transaksi                 |
| `amount`      | number  | Nominal pembayaran (IDR)         |
| `fee`         | number  | Biaya admin (IDR)                |
| `totalAmount` | number  | Total yang dibayar (IDR)         |
| `paidAt`      | string  | Waktu pembayaran (ISO, nullable) |

Status yang mungkin:

| Status      | Description            |
| ----------- | ---------------------- |
| `pending`   | Menunggu pembayaran    |
| `paid`      | Pembayaran berhasil    |
| `failed`    | Pembayaran gagal       |
| `expired`   | Pembayaran kadaluarsa  |
| `cancelled` | Dibatalkan             |
| `refunded`  | Dikembalikan (refund)  |

---

## Provider Accounts

Semua endpoint provider account memerlukan Bearer token.

### Get Accounts

Mendukung filter by `providerId` dan pagination.

#### Request

```http
GET /api/v1/provider-accounts?page=1&pageSize=10&providerId=p1r2o3v4-i5d6-e7r8-9012-345678901234
```

Query parameters:

| Parameter    | Type   | Required | Default | Description             |
| ------------ | ------ | -------- | ------- | ----------------------- |
| `page`       | number | No       | 1       | Halaman                 |
| `pageSize`   | number | No       | 10      | Jumlah item per halaman |
| `providerId` | string | No       | -       | Filter by UUID provider |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "items": [
            {
                "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
                "name": "Tripay Production",
                "environment": "production",
                "isActive": true,
                "createdAt": "2026-01-01T00:00:00.000Z",
                "updatedAt": "2026-01-01T00:00:00.000Z"
            }
        ],
        "meta": {
            "page": 1,
            "pageSize": 10,
            "totalItems": 5,
            "totalPages": 1,
            "hasNextPage": false,
            "hasPreviousPage": false
        }
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

| Field         | Type    | Description                         |
| ------------- | ------- | ----------------------------------- |
| `id`          | string  | UUID provider account               |
| `providerId`  | string  | UUID provider terkait               |
| `name`        | string  | Nama akun provider                  |
| `environment` | string  | Environment (`production`, `sandbox`) |
| `isActive`    | boolean | Status akun                         |
| `createdAt`   | string  | Tanggal dibuat (ISO)                |
| `updatedAt`   | string  | Tanggal update (ISO)                |

---

### Get Account Detail

#### Request

```http
GET /api/v1/provider-accounts/{id}
```

Path parameters:

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `id`      | string | Yes      | UUID provider account   |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Provider account found",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
        "name": "Tripay Production",
        "apiKey": "xxxx",
        "secretKey": "xxxx",
        "merchantCode": "T123",
        "environment": "production",
        "isActive": true,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Create Account

#### Request

```http
POST /api/v1/provider-accounts
```

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "name": "Tripay Production",
    "apiKey": "xxxx",
    "secretKey": "xxxx",
    "merchantCode": "T123",
    "environment": "production"
}
```

| Field          | Type   | Required | Description                  |
| -------------- | ------ | -------- | ---------------------------- |
| `providerId`   | string | Yes      | UUID provider                |
| `name`         | string | Yes      | Nama akun                    |
| `apiKey`       | string | No       | API key provider             |
| `secretKey`    | string | No       | Secret key provider          |
| `merchantCode` | string | No       | Kode merchant dari provider  |
| `environment`  | string | No       | Environment (default: `sandbox`) |

#### Response

**201 Created**

```json
{
    "status": true,
    "message": "Provider account created",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Update Account

#### Request

```http
PATCH /api/v1/provider-accounts/{id}
```

Path parameters:

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `id`      | string | Yes      | UUID provider account   |

```json
{
    "name": "Tripay Sandbox",
    "apiKey": "yyyy",
    "isActive": false
}
```

| Field          | Type    | Required | Description                  |
| -------------- | ------- | -------- | ---------------------------- |
| `name`         | string  | No       | Nama akun                    |
| `apiKey`       | string  | No       | API key provider             |
| `secretKey`    | string  | No       | Secret key provider          |
| `merchantCode` | string  | No       | Kode merchant dari provider  |
| `isActive`     | boolean | No       | Status akun                  |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Provider account updated",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Toggle Active Account

#### Request

```http
PATCH /api/v1/provider-accounts/{id}/toggle-active
```

Path parameters:

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `id`      | string | Yes      | UUID provider account   |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Provider account active status toggled",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "isActive": false
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Delete Account

#### Request

```http
DELETE /api/v1/provider-accounts/{id}
```

Path parameters:

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `id`      | string | Yes      | UUID provider account   |

#### Response

**204 No Content**

---

## Transactions

Semua endpoint transaction memerlukan Bearer token.

### Get Transactions

Mendukung filter dan pagination.

#### Request

```http
GET /api/v1/transaction?page=1&pageSize=10&status=paid&startDate=2026-06-01&endDate=2026-06-30
```

Query parameters:

| Parameter   | Type   | Required | Default | Description                       |
| ----------- | ------ | -------- | ------- | --------------------------------- |
| `page`      | number | No       | 1       | Halaman                           |
| `pageSize`  | number | No       | 10      | Jumlah item per halaman           |
| `status`    | string | No       | -       | Filter status                     |
| `startDate` | string | No       | -       | Filter tanggal awal (ISO date)    |
| `endDate`   | string | No       | -       | Filter tanggal akhir (ISO date)   |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "items": [
            {
                "id": "t1r2x3n4-a5c6-t7i8-o9n0-123456789012",
                "invoiceNo": "INV-20260605-0001",
                "providerCode": "tripay",
                "channelCode": "QRIS",
                "amount": 10000,
                "fee": 1000,
                "totalAmount": 11000,
                "status": "paid",
                "paidAt": "2026-06-05T12:00:00.000Z",
                "createdAt": "2026-06-05T10:00:00.000Z"
            }
        ],
        "meta": {
            "page": 1,
            "pageSize": 10,
            "totalItems": 100,
            "totalPages": 10,
            "hasNextPage": true,
            "hasPreviousPage": false
        }
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

### Get Transaction Detail

#### Request

```http
GET /api/v1/transaction/{id}
```

Path parameters:

| Parameter | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| `id`      | string | Yes      | UUID transaksi     |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "id": "t1r2x3n4-a5c6-t7i8-o9n0-123456789012",
        "invoiceNo": "INV-20260605-0001",
        "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
        "paymentChannelId": "c1h2a3n4-n5e6-l7s8-9012-345678901234",
        "providerReference": "TRX123456",
        "amount": 10000,
        "fee": 1000,
        "totalAmount": 11000,
        "status": "paid",
        "expiredAt": "2026-06-06T10:00:00.000Z",
        "paidAt": "2026-06-05T12:00:00.000Z",
        "createdAt": "2026-06-05T10:00:00.000Z",
        "updatedAt": "2026-06-05T12:00:05.000Z"
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

**404 Not Found**

```json
{
    "status": false,
    "statusCode": 404,
    "errorCode": "TRANSACTION_NOT_FOUND",
    "message": "Transaksi tidak ditemukan",
    "errors": []
}
```

---

## Webhooks

Endpoint webhook tidak memerlukan Bearer token. Keamanan menggunakan verifikasi signature dari masing-masing provider.

### Tripay

#### Request

```http
POST /api/v1/webhook/tripay
```

Payload mengikuti dokumentasi resmi Tripay.

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "reference": "T12345678",
    "merchant_ref": "INV-20260605-0001",
    "status": "PAID",
    "signature": "abc123hash..."
}
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Webhook processed",
    "data": null,
    "timestamp": "2026-06-05T12:00:00.000Z"
}
```

**401 Unauthorized**

```json
{
    "status": false,
    "statusCode": 401,
    "errorCode": "WEBHOOK_INVALID_SIGNATURE",
    "message": "Signature webhook tidak valid",
    "errors": []
}
```

---

### Duitku

#### Request

```http
POST /api/v1/webhook/duitku
```

Payload mengikuti dokumentasi resmi Duitku.

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "merchantOrderId": "INV-20260605-0001",
    "reference": "D12345678",
    "statusCode": "00",
    "amount": 10000,
    "signature": "abc123hash..."
}
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Webhook processed",
    "data": null,
    "timestamp": "2026-06-05T12:00:00.000Z"
}
```

**401 Unauthorized**

```json
{
    "status": false,
    "statusCode": 401,
    "errorCode": "WEBHOOK_INVALID_SIGNATURE",
    "message": "Signature webhook tidak valid",
    "errors": []
}
```

---

### Paydisini

#### Request

```http
POST /api/v1/webhook/paydisini
```

Payload mengikuti dokumentasi resmi Paydisini.

```json
{
    "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
    "trx_id": "PD123456",
    "request": "INV-20260605-0001",
    "status": "Success",
    "amount": 10000,
    "signature": "abc123hash..."
}
```

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Webhook processed",
    "data": null,
    "timestamp": "2026-06-05T12:00:00.000Z"
}
```

**401 Unauthorized**

```json
{
    "status": false,
    "statusCode": 401,
    "errorCode": "WEBHOOK_INVALID_SIGNATURE",
    "message": "Signature webhook tidak valid",
    "errors": []
}
```

---

## Audit

Semua endpoint audit memerlukan Bearer token.

### Provider Logs

Melihat log panggilan ke provider. Mendukung filter dan pagination.

#### Request

```http
GET /api/v1/audit/provider-logs?page=1&pageSize=10&providerId=xxx&endpoint=/transaction/create&startDate=2026-06-01&endDate=2026-06-30
```

Query parameters:

| Parameter  | Type   | Required | Default | Description                       |
| ---------- | ------ | -------- | ------- | --------------------------------- |
| `page`     | number | No       | 1       | Halaman                           |
| `pageSize` | number | No       | 10      | Jumlah item per halaman           |
| `providerId` | string | No     | -       | Filter UUID provider              |
| `endpoint` | string | No       | -       | Filter endpoint                   |
| `startDate`| string | No       | -       | Filter tanggal awal (ISO date)    |
| `endDate`  | string | No       | -       | Filter tanggal akhir (ISO date)   |

#### Response

**200 OK**

```json
{
    "status": true,
    "message": "Success",
    "data": {
        "items": [
            {
                "id": "l1o2g3-4567-8901-2345-678901234567",
                "providerId": "p1r2o3v4-i5d6-e7r8-9012-345678901234",
                "providerCode": "tripay",
                "endpoint": "/transaction/create",
                "method": "POST",
                "requestBody": {},
                "responseBody": {},
                "statusCode": 200,
                "duration": 450,
                "createdAt": "2026-06-05T10:00:00.000Z"
            }
        ],
        "meta": {
            "page": 1,
            "pageSize": 10,
            "totalItems": 45,
            "totalPages": 5,
            "hasNextPage": true,
            "hasPreviousPage": false
        }
    },
    "timestamp": "2026-06-05T10:00:00.000Z"
}
```

---

## Error Codes

| Error Code                  | HTTP Status | Description                          |
| --------------------------- | ----------- | ------------------------------------ |
| `AUTH_INVALID_CREDENTIALS`  | 401         | Username atau password salah         |
| `AUTH_UNAUTHORIZED`         | 401         | Token tidak valid atau expired       |
| `PROVIDER_NOT_FOUND`        | 404         | Provider tidak ditemukan             |
| `PROVIDER_INACTIVE`         | 400         | Provider dalam status nonaktif       |
| `CHANNEL_NOT_FOUND`         | 404         | Channel pembayaran tidak ditemukan   |
| `PAYMENT_CREATE_FAILED`     | 500         | Gagal membuat pembayaran             |
| `PAYMENT_NOT_FOUND`         | 404         | Pembayaran tidak ditemukan           |
| `TRANSACTION_NOT_FOUND`     | 404         | Transaksi tidak ditemukan            |
| `WEBHOOK_INVALID_SIGNATURE` | 401         | Signature webhook tidak valid        |
| `VALIDATION_ERROR`          | 400         | Validasi input gagal                 |

---

## Rate Limiting

- Umum: 60 requests per 60 detik per IP
- Create Payment: 10 requests per 60 detik per IP
- Webhook: Tidak dibatasi

Rate limit header response:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1623456789
```
