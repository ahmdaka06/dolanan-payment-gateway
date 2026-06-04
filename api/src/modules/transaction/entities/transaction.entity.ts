import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { TransactionStatus } from '../../../common/enums/transaction-status.enum';
import { Provider } from '../../provider/entities/provider.entity';
import { ProviderAccount } from '../../provider-account/entities/provider-account.entity';
import { PaymentChannel } from '../../payment-channel/entities/payment-channel.entity';

@Entity('transactions')
@Index('IDX_transactions_invoice_no', ['invoiceNo'])
@Index('IDX_transactions_provider_reference', ['providerReference'])
@Index('IDX_transactions_status', ['status'])
@Index('IDX_transactions_created_at', ['createdAt'])
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    invoiceNo: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'provider_id' })
    providerId: string;

    @ManyToOne(() => ProviderAccount)
    @JoinColumn({ name: 'provider_account_id' })
    providerAccount: ProviderAccount;

    @Column({ name: 'provider_account_id' })
    providerAccountId: string;

    @ManyToOne(() => PaymentChannel)
    @JoinColumn({ name: 'payment_channel_id' })
    paymentChannel: PaymentChannel;

    @Column({ name: 'payment_channel_id' })
    paymentChannelId: string;

    @Column({ nullable: true })
    providerReference: string;

    @Column('decimal', { precision: 18, scale: 2 })
    amount: number;

    @Column('decimal', { precision: 18, scale: 2 })
    fee: number;

    @Column('decimal', { precision: 18, scale: 2 })
    totalAmount: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
    status: TransactionStatus;

    @Column({ nullable: true })
    expiredAt: Date;

    @Column({ nullable: true })
    paidAt: Date;

    @Column({ type: 'json', nullable: true })
    rawRequest: any;

    @Column({ type: 'json', nullable: true })
    rawResponse: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
