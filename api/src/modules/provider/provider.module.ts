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
