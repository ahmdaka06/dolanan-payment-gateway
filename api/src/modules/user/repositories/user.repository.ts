import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOneBy({ email });
    }
}
