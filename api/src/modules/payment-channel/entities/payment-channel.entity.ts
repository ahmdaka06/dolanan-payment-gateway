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
import { Provider } from '../../provider/entities/provider.entity';

@Entity('payment_channels')
export class PaymentChannel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'provider_id' })
    providerId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 18, scale: 2, nullable: true })
    feeFlat: number;

    @Column('decimal', { precision: 8, scale: 2, nullable: true })
    feePercent: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
