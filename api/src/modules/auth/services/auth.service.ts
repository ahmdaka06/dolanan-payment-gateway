import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../../config/app-config.service';
import { AuthRepository } from '../repositories/auth.repository';
import {
    AccessTokenPayload,
    RefreshTokenPayload,
    TokenPairData,
    TokenPairPayload,
} from '../types/jwt-payload.type';
import { LoginDto } from '../dto/payload/login.dto';
import { AuthResponse } from '../dto/response/auth-response.dto';
import {
    AuthInvalidCredentialsException,
    AuthUnauthorizedException,
    UserNotFoundException,
} from 'src/common/exceptions';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
    private readonly saltRounds = 12;

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly config: AppConfigService,
    ) {}

    async login(body: LoginDto): Promise<AuthResponse> {
        const { email, password } = body;

        const user = await this.authRepository.findUserByEmail(email);

        if (!user) {
            throw new AuthInvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AuthInvalidCredentialsException();
        }

        return this.generateTokenPair({ id: user.id, email: user.email });
    }

    async refresh(refreshToken: string): Promise<AuthResponse> {
        const payload = await this.verifyRefreshToken(refreshToken);

        await this.authRepository.deleteRefreshToken(payload.jti);

        const user = await this.authRepository.findUserById(payload.sub);

        if (!user) {
            throw new UserNotFoundException(payload.sub);
        }

        return this.generateTokenPair({ id: user.id, email: user.email });
    }

    async logout(refreshToken: string): Promise<void> {
        const payload = await this.verifyRefreshToken(refreshToken).catch(() => null);

        if (payload) {
            await this.authRepository.deleteRefreshToken(payload.jti);
        }
    }

    async getProfile(userId: string): Promise<User> {
        const user = await this.authRepository.findUserById(userId);

        if (!user) {
            throw new UserNotFoundException(userId);
        }

        return user;
    }

    private async generateTokenPair(user: TokenPairPayload): Promise<TokenPairData> {
        const refreshTokenId = randomUUID();

        const accessTokenPayload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
        };

        const refreshTokenPayload: RefreshTokenPayload = {
            sub: user.id,
            email: user.email,
            jti: refreshTokenId,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessTokenPayload, {
                secret: this.config.jwtAccessSecret,
                expiresIn: this.config.jwtAccessExpiresIn as any,
            }),
            this.jwtService.signAsync(refreshTokenPayload, {
                secret: this.config.jwtRefreshSecret,
                expiresIn: this.config.jwtRefreshExpiresIn as any,
            }),
        ]);

        const refreshTokenHash = await bcrypt.hash(refreshToken, this.saltRounds);

        await this.authRepository.createRefreshToken({
            id: refreshTokenId,
            userId: user.id,
            tokenHash: refreshTokenHash,
            expiresAt: this.getExpiresAt(this.config.jwtRefreshExpiresIn),
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
        const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
            secret: this.config.jwtRefreshSecret,
        }).catch(() => {
            throw new AuthUnauthorizedException('Invalid refresh token');
        });

        const stored = await this.authRepository.findRefreshTokenById(payload.jti);

        if (!stored) {
            throw new AuthUnauthorizedException('Refresh token revoked');
        }

        return payload;
    }

    private getExpiresAt(expiresIn: string): Date {
        const match = expiresIn.match(/^(\d+)(s|m|h|d)$/);

        if (!match) {
            throw new Error(`Invalid JWT_REFRESH_EXPIRES_IN format: ${expiresIn}`);
        }

        const value = Number(match[1]);
        const unit = match[2];

        const multiplier: Record<string, number> = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };

        return new Date(Date.now() + value * multiplier[unit]);
    }
}
