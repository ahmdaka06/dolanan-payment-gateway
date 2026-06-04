import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    constructor(private dataSource: DataSource) {
        super(Transaction, dataSource.createEntityManager());
    }

    async findByInvoiceNo(invoiceNo: string): Promise<Transaction | null> {
        return this.findOne({ where: { invoiceNo } });
    }

    async findByProviderReference(providerReference: string): Promise<Transaction | null> {
        return this.findOne({ where: { providerReference } });
    }
}
