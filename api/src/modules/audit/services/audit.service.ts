import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderLogRepository } from './repositories/provider-log.repository';

@Injectable()
export class AuditService {
    constructor(
        private readonly providerLogRepository: ProviderLogRepository,
    ) { }
}
