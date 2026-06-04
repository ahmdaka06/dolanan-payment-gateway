import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from './repositories/transaction.repository';

@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepository: TransactionRepository,
    ) { }
}
