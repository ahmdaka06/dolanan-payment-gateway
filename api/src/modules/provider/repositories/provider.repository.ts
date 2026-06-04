import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';
import { ProviderCode } from '../../../common/enums/provider-code.enum';

@Injectable()
export class ProviderRepository extends Repository<Provider> {
    constructor(private dataSource: DataSource) {
        super(Provider, dataSource.createEntityManager());
    }

    async findByCode(code: ProviderCode): Promise<Provider | null> {
        return this.findOne({ where: { code } });
    }
}
