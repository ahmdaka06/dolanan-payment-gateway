import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderLog } from './entities/provider-log.entity';
import { AuditController } from './controllers/audit.controller';
import { AuditService } from './services/audit.service';
import { ProviderLogRepository } from './repositories/provider-log.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderLog])],
    controllers: [AuditController],
    providers: [AuditService, ProviderLogRepository],
    exports: [AuditService, ProviderLogRepository],
})
export class AuditModule {}
