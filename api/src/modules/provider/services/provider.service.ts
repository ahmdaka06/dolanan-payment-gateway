import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderRepository } from '../repositories/provider.repository';
import { Provider } from '../entities/provider.entity';
import { ProviderCode } from '../../../common/enums/provider-code.enum';

@Injectable()
export class ProviderService {
    constructor(
        private readonly providerRepository: ProviderRepository,
    ) {}

    async findByCode(code: ProviderCode): Promise<Provider> {
        const provider = await this.providerRepository.findByCode(code);
        if (!provider) {
            throw new NotFoundException(`Provider with code ${code} not found`);
        }
        return provider;
    }
}
