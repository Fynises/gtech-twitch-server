import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TwitchAuthEntity } from '../twitch-auth/twitch-auth.entity';

@Entity('websocket_config')
export class WebsocketConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @OneToOne(() => TwitchAuthEntity, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
  userId: TwitchAuthEntity;

  @Column({ type: 'varchar', length: 36, name: 'socket_uid' })
  socketUid: string;
}
