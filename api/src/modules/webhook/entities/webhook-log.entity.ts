import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('webhook_logs')
@Index('IDX_webhook_logs_transaction_id', ['transactionId'])
@Index('IDX_webhook_logs_provider_id', ['providerId'])
export class WebhookLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Transaction)
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;

    @Column({ name: 'transaction_id', nullable: true })
    transactionId: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'provider_id' })
    providerId: string;

    @Column({ nullable: true })
    signature: string;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ type: 'json' })
    payload: any;

    @CreateDateColumn()
    createdAt: Date;
}
