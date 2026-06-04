import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeed {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async run() {
        const adminExists = await this.userRepository.findOne({
            where: { username: 'admin' },
        });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await this.userRepository.save({
                username: 'admin',
                password: hashedPassword,
            });
        }
    }
}
