import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: NestConfigService) {}

  get nodeEnv(): string {
    return this.config.get<string>('NODE_ENV') ?? 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get port(): number {
    return Number(this.config.get<string>('APP_PORT') ?? 3001);
  }

  get apiPrefix(): string {
    return this.config.get<string>('APP_PREFIX') ?? 'api';
  }

  // Database
  get dbHost(): string {
    return this.config.getOrThrow<string>('DB_HOST');
  }

  get dbPort(): number {
    return Number(this.config.getOrThrow<string>('DB_PORT'));
  }

  get dbUsername(): string {
    return this.config.getOrThrow<string>('DB_USERNAME');
  }

  get dbPassword(): string {
    return this.config.getOrThrow<string>('DB_PASSWORD');
  }

  get dbDatabase(): string {
    return this.config.getOrThrow<string>('DB_DATABASE');
  }

  // Redis
  get redisHost(): string {
    return this.config.get<string>('REDIS_HOST') ?? 'localhost';
  }

  get redisPort(): number {
    return Number(this.config.get<string>('REDIS_PORT') ?? 6379);
  }

  get redisPassword(): string | undefined {
    return this.config.get<string>('REDIS_PASSWORD') || undefined;
  }

  get redisDb(): number {
    return Number(this.config.get<string>('REDIS_DB') ?? 0);
  }

  // JWT
  get jwtSecret(): string {
    return this.config.getOrThrow<string>('JWT_SECRET');
  }

  get jwtExpiresIn(): string {
    return this.config.get<string>('JWT_EXPIRES_IN') ?? '1d';
  }

  get jwtAccessSecret(): string {
    return this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
  }

  get jwtRefreshSecret(): string {
    return this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
  }

  get jwtAccessExpiresIn(): string {
    return this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m';
  }

  get jwtRefreshExpiresIn(): string {
    return this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';
  }

  // Throttle
  get throttleTtl(): number {
    return Number(this.config.get<string>('THROTTLE_TTL') ?? 60000);
  }

  get throttleLimit(): number {
    return Number(this.config.get<string>('THROTTLE_LIMIT') ?? 100);
  }

  // Payment providers
  get tripayApiUrl(): string {
    return this.config.get<string>('TRIPAY_API_URL') ?? 'https://api.tripay.co.id';
  }

  get paydisiniApiUrl(): string {
    return this.config.get<string>('PAYDISINI_API_URL') ?? 'https://api.paydisini.co.id';
  }

  get duitkuApiUrl(): string {
    return this.config.get<string>('DUITKU_API_URL') ?? 'https://api.duitku.com';
  }
}
