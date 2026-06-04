import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderRepository } from './repositories/provider.repository';

@Injectable()
export class ProviderService {
    constructor(
        private readonly providerRepository: ProviderRepository,
    ) { }
}
