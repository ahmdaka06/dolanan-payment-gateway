import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AppConfigModule } from '../../config/app-config.module';
import { AppConfigService } from '../../config/app-config.service';
import { createJwtOptions } from '../../config/jwt/jwt.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, RefreshToken]),
        AppConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => createJwtOptions(config),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
