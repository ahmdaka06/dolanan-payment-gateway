import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { Environment } from '../enums/environment.enum';

@Entity('provider_accounts')
export class ProviderAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'provider_id' })
    providerId: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    apiKey: string;

    @Column({ type: 'text', nullable: true })
    secretKey: string;

    @Column({ nullable: true })
    merchantCode: string;

    @Column({
        type: 'enum',
        enum: Environment,
        nullable: true,
    })
    environment: Environment;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
