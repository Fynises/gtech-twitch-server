import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ActivationConfig } from './dto/activation-config';

@Entity('channel_reward_config')
export class ChannelRewardConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line prettier/prettier
  @Column({ name: 'channel_reward_id', type: 'varchar', length: 36, unique: true })
  channelRewardId: string;

  @Column({ name: 'owner_user_id', type: 'varchar', length: 10 })
  userId: string;

  @Column({ name: 'is_enabled', type: 'bool' })
  isEnabled: boolean;

  @Column({ name: 'activation_config', type: 'jsonb' })
  activationConfig: ActivationConfig;

  /**
   * This column will be used in functionality
   * to detect if the associated channel reward has been deleted
   * by the user-side,
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timeLastValidated: Date;
}
