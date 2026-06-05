import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { CreateRefreshTokenData } from '../types/jwt-payload.type';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepo: Repository<RefreshToken>,
    ) {}

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }

    async createUser(data: { email: string; password: string }): Promise<User> {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    async findRefreshTokenById(id: string): Promise<RefreshToken | null> {
        return this.refreshTokenRepo.findOneBy({ id });
    }

    async createRefreshToken(data: CreateRefreshTokenData): Promise<RefreshToken> {
        const token = this.refreshTokenRepo.create(data);
        return this.refreshTokenRepo.save(token);
    }

    async deleteRefreshToken(id: string): Promise<void> {
        await this.refreshTokenRepo.delete({ id });
    }

    async deleteUserRefreshTokens(userId: string): Promise<void> {
        await this.refreshTokenRepo.delete({ userId });
    }
}
