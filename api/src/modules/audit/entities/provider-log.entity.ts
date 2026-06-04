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

@Entity('provider_logs')
@Index('IDX_provider_logs_provider_id', ['providerId'])
@Index('IDX_provider_logs_created_at', ['createdAt'])
export class ProviderLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column({ name: 'provider_id' })
    providerId: string;

    @Column()
    endpoint: string;

    @Column({ type: 'json', nullable: true })
    requestBody: any;

    @Column({ type: 'json', nullable: true })
    responseBody: any;

    @Column({ nullable: true })
    statusCode: number;

    @CreateDateColumn()
    createdAt: Date;
}
