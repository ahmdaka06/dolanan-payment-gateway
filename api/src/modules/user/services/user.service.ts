import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }
}
