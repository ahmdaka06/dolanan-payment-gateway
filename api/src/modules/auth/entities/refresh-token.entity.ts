import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('refresh_tokens')
@Index(['userId'])
export class RefreshToken {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    userId: string;

    @Column()
    tokenHash: string;

    @Column({ type: 'timestamptz' })
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}
