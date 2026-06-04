import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderAccount } from './entities/provider-account.entity';
import { ProviderAccountService } from './services/provider-account.service';
import { ProviderAccountRepository } from './repositories/provider-account.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderAccount])],
    providers: [ProviderAccountService, ProviderAccountRepository],
    exports: [ProviderAccountService, ProviderAccountRepository],
})
export class ProviderAccountModule {}
