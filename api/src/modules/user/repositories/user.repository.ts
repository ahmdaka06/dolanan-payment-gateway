import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import type { PaginatedResult } from '../../../common/types/pagination.type';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async findPaginated(page: number, pageSize: number): Promise<PaginatedResult<User>> {
        const [items, totalItems] = await this.userRepo.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' },
        });

        return {
            items,
            meta: {
                page,
                pageSize,
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                hasNextPage: page * pageSize < totalItems,
                hasPreviousPage: page > 1,
            },
        };
    }

    findById(id: string): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }

    create(data: Partial<User>): Promise<User> {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        await this.userRepo.update(id, data);
        return this.userRepo.findOneByOrFail({ id });
    }

    async delete(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
