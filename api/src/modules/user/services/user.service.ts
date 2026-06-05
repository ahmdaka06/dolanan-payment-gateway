import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserNotFoundException, CannotDeleteSelfException } from '../../../common/exceptions';
import type { PaginatedResult, PaginationOptions } from '../../../common/types/pagination.type';

@Injectable()
export class UserService {
    private readonly saltRounds = 12;

    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);

        return this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
        });
    }

    getAllUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
        const page = options.page ?? 1;
        const pageSize = options.pageSize ?? 10;

        return this.userRepository.findPaginated(page, pageSize);
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserNotFoundException(id);
        }

        return user;
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);

        const updateData: Partial<User> = {};

        if (dto.email !== undefined) {
            updateData.email = dto.email;
        }

        if (dto.password !== undefined) {
            updateData.password = await bcrypt.hash(dto.password, this.saltRounds);
        }

        return this.userRepository.update(id, updateData);
    }

    async deleteUser(id: string, currentUserId: string): Promise<void> {
        if (id === currentUserId) {
            throw new CannotDeleteSelfException();
        }

        await this.getUserById(id);
        await this.userRepository.delete(id);
    }

    async updateProfile(userId: string, dto: UpdateUserDto): Promise<User> {
        return this.updateUser(userId, dto);
    }
}
