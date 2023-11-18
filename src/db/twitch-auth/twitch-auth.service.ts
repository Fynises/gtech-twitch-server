import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TwitchAuthEntity } from './twitch-auth.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '@twurple/auth';

@Injectable()
export class TwitchAuthDbService {
  constructor(
    @InjectRepository(TwitchAuthEntity)
    private readonly repository: Repository<TwitchAuthEntity>,
  ) {}

  async getUser(userId: string): Promise<[string, AccessToken]> {
    const res = await this.repository.findOneBy({
      userId: userId,
    });
    if (res === null) {
      throw new Error(`user_id: ${userId} was not found in database`);
    }
    return [userId, res.toAccessToken()];
  }

  async getEntity(userId: string): Promise<TwitchAuthEntity | null> {
    return await this.repository.findOneBy({
      userId: userId,
    });
  }

  /**
   * applicable to new logins and refreshes
   */
  async onSave(userId: string, newTokenData: AccessToken): Promise<void> {
    //const entity = new TwitchAuthEntity(userId, newTokenData);
    const entity = this.repository.create({
      userId: userId,
      accessToken: newTokenData.accessToken,
      expiresIn: newTokenData.expiresIn,
      obtainmentTimestamp: newTokenData.obtainmentTimestamp,
      refreshToken: newTokenData.refreshToken,
      scope: newTokenData.scope,
    });
    await this.repository.save(entity);
  }
}
