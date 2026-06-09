# Dolanan Payment Gateway — Coding Rules

Standar penulisan kode dan struktur project untuk AI Agent dan developer tim.
Rules ini **wajib** diikuti saat menulis kode baru.

---

## 1. Tech Stack

| Layer | Library |
|-------|---------|
| Framework | NestJS 11 + Fastify adapter (bukan Express) |
| Database | PostgreSQL via TypeORM 1.x |
| Auth | JWT (access + refresh token) via Passport |
| Validation | class-validator + class-transformer |
| Cache | ioredis |
| Rate Limit | @nestjs/throttler (Redis-backed) |
| Docs | @nestjs/swagger |
| Test | Jest 30.x |
| Lint | ESLint 9 flat config + Prettier |

---

## 2. Module Directory Structure

Setiap modul **WAJIB** mengikuti struktur ini:

```
modules/{module-name}/
  {module-name}.module.ts
  controllers/
    {module-name}.controller.ts
  entities/
    {entity-name}.entity.ts
  services/
    {module-name}.service.ts
  repositories/
    {module-name}.repository.ts
  dto/
    payload/                    ← Input validation DTO (class-validator)
      create-{entity}.dto.ts
      update-{entity}.dto.ts
    response/                   ← Response serialization DTO (Swagger @ApiProperty)
      {entity}-response.dto.ts
  types/                        ← Type alias (service/repository)
    create-{entity}-data.type.ts
    update-{entity}-data.type.ts
    {entity}-filter.type.ts
```

**Contoh lengkap**: `modules/user/` adalah acuan utama untuk module CRUD baru.

---

## 3. Clean Separation: DTO vs Types

**INI PENTING. JANGAN SAMPAI TERTUKAR.**

### DTO — untuk Controller (HTTP Layer)

| Folder | Kegunaan | Decorator |
|--------|----------|-----------|
| `dto/payload/` | Input validation | `class-validator` (`@IsString`, `@IsEnum`, dll.) |
| `dto/response/` | Response serialization | `@ApiProperty()` untuk Swagger |

```typescript
// dto/payload/create-provider.dto.ts
import { IsEnum, IsString } from 'class-validator';
import { ProviderCode } from '../../../common/enums/provider-code.enum';

export class CreateProviderDto {
    @IsEnum(ProviderCode)
    code: ProviderCode;

    @IsString()
    name: string;
}
```

```typescript
// dto/response/provider-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ProviderResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
```

### Types (`types/`) — untuk Service & Repository (Business Layer)
- **Pakai TypeScript `type` alias, tanpa decorator apapun**
- Dipakai di Service method parameter
- Tidak boleh pakai class-validator / class-transformer
- File extension `.type.ts`

```typescript
// types/create-provider-data.type.ts
import { ProviderCode } from '../../../common/enums/provider-code.enum';

export type CreateProviderData = {
    code: ProviderCode;
    name: string;
};
```

```typescript
// types/update-provider-data.type.ts
export type UpdateProviderData = {
    name?: string;
    isActive?: boolean;
};
```

---

## 4. Module File (`*.module.ts`)

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { ProviderController } from './controllers/provider.controller';
import { ProviderService } from './services/provider.service';
import { ProviderRepository } from './repositories/provider.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Provider])],
    controllers: [ProviderController],
    providers: [ProviderService, ProviderRepository],
    exports: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
```

**Rules**:
- `exports` harus mencakup `Service` dan `Repository` (agar bisa di-inject oleh module lain)
- Urutan import: Entity → Controller → Service → Repository

---

## 5. Entity (`entities/*.entity.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('providers')
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ProviderCode, unique: true })
    code: ProviderCode;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

**Rules**:
- **SEMUA entity wajib** punya 4 field timestamp-audit: `id` (uuid), `isActive` (boolean default true), `createdAt`, `updatedAt`
- Nama tabel: snake_case plural (`providers`, `provider_accounts`, `payment_channels`)
- Kolom foreign key: `{relation_name}_id` (contoh: `provider_id`)

---

## 6. Controller (`controllers/*.controller.ts`)

```typescript
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Providers')
@ApiBearerAuth()
@Controller('providers')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) {}

    @Get()
    @ApiOperation({ summary: 'Get all providers' })
    @ApiOkResponse({ description: 'List of providers', type: ResponseDto(Provider) })
    async getAllProviders() { ... }

    @Get(':id')
    @ApiOperation({ summary: 'Get provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider found', type: ResponseDto(Provider) })
    async getProviderById(@Param('id') id: string) { ... }

    @Post()
    @ApiOperation({ summary: 'Create a new provider' })
    @ApiBody({ type: CreateProviderDto })
    @ApiOkResponse({ description: 'Provider created', type: ResponseDto(Provider) })
    @HttpCode(HttpStatus.CREATED)
    async createProvider(@Body() dto: CreateProviderDto) { ... }

    @Patch(':id')
    @ApiOperation({ summary: 'Update provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProviderDto })
    @ApiOkResponse({ description: 'Provider updated', type: ResponseDto(Provider) })
    async updateProvider(@Param('id') id: string, @Body() dto: UpdateProviderDto) { ... }

    @Patch(':id/toggle-active')
    @ApiOperation({ summary: 'Toggle provider active status' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Active status toggled', type: ResponseDto(Provider) })
    async toggleActive(@Param('id') id: string) { ... }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProvider(@Param('id') id: string) { ... }
}
```

**Rules**:
- **Wajib** ada `@ApiBearerAuth()` di setiap controller (kecuali auth module)
- Setiap endpoint **wajib** punya `@ApiOperation({ summary: '...' })`
- Response pakai `ResponseDto(Entity)` helper dari `common/dto/response/api-response.dto.ts`
- **Wajib** ada endpoint `PATCH /:id/toggle-active` untuk toggle `isActive`
- POST return `201` dengan `@HttpCode(HttpStatus.CREATED)`
- DELETE return `204` dengan `@HttpCode(HttpStatus.NO_CONTENT)`
- Controller **tidak boleh** berisi business logic. Hanya delegasi ke service.
- Import DTO dari `../dto/payload/` (input) dan `../../../common/dto/response/` (helper)

---

## 7. Service (`services/*.service.ts`)

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderRepository } from '../repositories/provider.repository';
import { Provider } from '../entities/provider.entity';
import type { CreateProviderData } from '../types/create-provider-data.type';
import type { UpdateProviderData } from '../types/update-provider-data.type';

@Injectable()
export class ProviderService {
    constructor(
        private readonly providerRepository: ProviderRepository,
    ) {}

    async findAll(): Promise<Provider[]> {
        return this.providerRepository.findAll();
    }

    async findOne(id: string): Promise<Provider> {
        const provider = await this.providerRepository.findById(id);
        if (!provider) {
            throw new NotFoundException(`Provider with ID ${id} not found`);
        }
        return provider;
    }

    async create(data: CreateProviderData): Promise<Provider> {
        return this.providerRepository.create(data);
    }

    async update(id: string, data: UpdateProviderData): Promise<Provider> {
        await this.findOne(id);               // pastikan exists
        return this.providerRepository.update(id, data);
    }

    async toggleActive(id: string): Promise<Provider> {
        const provider = await this.findOne(id);
        return this.providerRepository.update(id, { isActive: !provider.isActive });
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);               // pastikan exists
        await this.providerRepository.delete(id);
    }
}
```

**Rules**:
- Service method **menerima type alias** (`CreateProviderData`), **bukan DTO** (`CreateProviderDto`)
- Import dari `../types/`, bukan dari `../dto/`
- `update()`: panggil `findOne(id)` dulu untuk cek existence, lalu delegasi ke repository
- `toggleActive()`: baca entity dulu, lalu flip `isActive`-nya
- Throw exception pakai custom exception dari `common/exceptions/` jika sudah ada; kalau belum, pakai NestJS `NotFoundException`
- **Jangan** pakai `console.log`, pakai NestJS `Logger`

---

## 8. Repository (`repositories/*.repository.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';

@Injectable()
export class ProviderRepository {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepo: Repository<Provider>,
    ) {}

    async findAll(): Promise<Provider[]> {
        return this.providerRepo.find({ order: { createdAt: 'DESC' } });
    }

    async findById(id: string): Promise<Provider | null> {
        return this.providerRepo.findOneBy({ id });
    }

    async findByCode(code: ProviderCode): Promise<Provider | null> {
        return this.providerRepo.findOneBy({ code });
    }

    async create(data: Partial<Provider>): Promise<Provider> {
        const provider = this.providerRepo.create(data);
        return this.providerRepo.save(provider);
    }

    async update(id: string, data: Partial<Provider>): Promise<Provider> {
        await this.providerRepo.update(id, data);
        return this.providerRepo.findOneByOrFail({ id });
    }

    async delete(id: string): Promise<void> {
        await this.providerRepo.delete(id);
    }
}
```

**Rules**:
- **WAJIB** pakai `@InjectRepository` (seperti di atas). **JANGAN** pakai `DataSource` + `extends Repository<Entity>`
- Repository adalah **plain class** (tidak extends apapun), membungkus `Repository<Entity>` dari TypeORM
- Return type `findOneBy*` adalah `Promise<Entity | null>` (bisa null)
- `update()`: pakai `this.repo.update(id, data)` lalu return `this.repo.findOneByOrFail({ id })`
- Tidak tampilkan error handling di repository (serahkan ke service)

---

## 9. Exceptions

**Wajib** pakai custom exceptions. Letakkan di `common/exceptions/`.

```typescript
// common/exceptions/provider-not-found.exception.ts
import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_CODE } from '../constants/error-code.constant';

export class ProviderNotFoundException extends AppException {
    constructor(id: string) {
        super(ERROR_CODE.PROVIDER_NOT_FOUND, `Provider with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
}
```

**Rules**:
- Semua custom exception extends `AppException`
- Constructor terima parameter spesifik (bukan hardcode message)
- Daftarkan error code ke `error-code.constant.ts`
- Daftarkan export ke `common/exceptions/index.ts` (barrel export)

---

## 10. Common Patterns

### Pagination

```typescript
// Service menerima PaginationOptions, return PaginatedResult<T>
async findAll(options: PaginationOptions): Promise<PaginatedResult<Entity>> {
    return this.repository.findPaginated(options.page ?? 1, options.pageSize ?? 10);
}
```

### Auth Bypass

```typescript
@Public()  // skip global JwtAuthGuard
@Post('login')
async login() { ... }
```

### Get Current User

```typescript
@Get('profile')
async getProfile(@CurrentUser() user: RequestUser) {
    return this.userService.getUserById(user.sub);
}
```

### Global ValidationPipe

Sudah terpasang di `main.ts`:
```typescript
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
}));
```

Properti yang tidak ada di DTO akan otomatis di-strip.

---

## 11. Naming Conventions

| Elemen | Konvensi | Contoh |
|--------|----------|--------|
| Module folder | param-case | `provider-account/` |
| Module file | param-case + `.module.ts` | `provider-account.module.ts` |
| Controller class | PascalCase + `Controller` | `ProviderAccountController` |
| Service class | PascalCase + `Service` | `ProviderAccountService` |
| Repository class | PascalCase + `Repository` | `ProviderAccountRepository` |
| Entity class | PascalCase | `ProviderAccount` |
| DTO class (payload) | PascalCase + `Dto` | `CreateProviderAccountDto` |
| DTO class (response) | PascalCase + `Response` | `ProviderAccountResponse` |
| Type alias | PascalCase + `Data` | `CreateProviderAccountData` |
| Table name | snake_case plural | `provider_accounts` |
| Route prefix | param-case plural | `@Controller('provider-accounts')` |
| DTO file | param-case + `.dto.ts` | `create-provider-account.dto.ts` |
| Type file | param-case + `.type.ts` | `create-provider-account-data.type.ts` |

---

## 12. Do's and Don'ts

### DO

- Gunakan `@InjectRepository` di semua repository
- Pisahkan DTO (controller) dan type alias (service)
- Pakai `dto/payload/` untuk input DTO, `dto/response/` untuk response DTO
- Pakai folder `types/` untuk type alias
- Pakai TypeScript `type` (bukan `interface`) di folder `types/`
- File type gunakan extension `.type.ts`
- Tambahkan `PATCH /:id/toggle-active` di setiap module CRUD
- Semua entity wajib punya `id`, `isActive`, `createdAt`, `updatedAt`
- Gunakan custom exception dari `common/exceptions/`
- Tambahkan Swagger decorator di setiap endpoint
- List relations di repository (`relations: { provider: true }`)
- Export Service dan Repository dari module

### DON'T

- JANGAN pakai `DataSource` + `extends Repository<Entity>` di repository
- JANGAN pakai DTO di service (pakai type alias)
- JANGAN tulis business logic di controller
- JANGAN tulis error handling di repository
- JANGAN pakai `console.log` (pakai NestJS `Logger`)
- JANGAN hardcode error message di exception class
- JANGAN skip `@ApiBearerAuth()` di controller
- JANGAN tambahkan dependency baru tanpa diskusi

---

## 13. Environment Variables

Semua config diakses melalui `AppConfigService` (`config/app-config.service.ts`), **jangan** pakai `process.env` langsung.

---

## 14. Reference Modules

Gunakan module ini sebagai acuan:

| Modul | Path | Ket |
|-------|------|-----|
| **User** | `modules/user/` | Acuan utama CRUD module |
| **Provider** | `modules/provider/` | CRUD dengan enum field |
| **ProviderAccount** | `modules/provider-account/` | CRUD dengan foreign key relation |
| **Auth** | `modules/auth/` | Auth pattern (JWT + refresh token) + dto payload/response structure |
| **Payment** | `modules/payment/` | Factory pattern + type alias |
