import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from '../app-config.service';

export function createDatabaseOptions(config: AppConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase,
    entities: [__dirname + '/../../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../../database/migrations/*.{ts,js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: !config.isProduction,
    logging: !config.isProduction,
    extra: {
      connectionLimit: 10,
    },
  };
}
