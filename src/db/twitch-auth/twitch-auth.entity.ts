import { AccessToken } from '@twurple/auth';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

/**
 * new entity for process of migrating to using twurple API
 * this will also serve as the primary key for userId
 */
@Entity('twitch_auth')
export class TwitchAuthEntity {
  @Index()
  @PrimaryColumn({ name: 'user_id', type: 'varchar', length: 10 })
  userId: string;

  @Column({ name: 'access_token', type: 'varchar', length: 64 })
  accessToken: string;

  @Column({ name: 'expires_in', type: 'int8', nullable: true })
  expiresIn: number | null;

  @Column({ name: 'obtainment_timestamp', type: 'int8' })
  obtainmentTimestamp: number;

  // eslint-disable-next-line prettier/prettier
  @Column({ name: 'refresh_token', type: 'varchar', length: 64, nullable: true })
  refreshToken: string | null;

  @Column({ name: 'scope', type: 'varchar', array: true })
  scope: string[];

  /**
   * returns the AccessToken object
   */
  toAccessToken(): AccessToken {
    return {
      accessToken: this.accessToken,
      expiresIn: this.expiresIn,
      obtainmentTimestamp: this.obtainmentTimestamp,
      refreshToken: this.refreshToken,
      scope: this.scope,
    };
  }
}
