/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsocketConfigEntity } from './websocket-config.entity';
import { Equal, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WebsocketConfigDbService {
  private readonly log = new Logger(WebsocketConfigDbService.name);
  constructor(
    @InjectRepository(WebsocketConfigEntity)
    private repository: Repository<WebsocketConfigEntity>,
  ) { }

  /**
   * gets the socketUid given the userId
   */
  async get(userId: string): Promise<string | null> {
    const res = await this.repository.findOneBy({ userId: Equal(userId) });
    this.log.warn(`getting value from websocket_config: ${JSON.stringify(res)}`)
    return res !== null ? res.socketUid : null;
  }

  /**
   * creates a new configuration, and returns the Uid
   * usually done on new user registration
   */
  async create(userId: string): Promise<void> {
    this.log.warn(`creating new websocket config for user_id: ${userId}`)
    await this.repository.upsert({
      userId: () => userId,
      socketUid: uuidv4()
    }, ['userId']);
  }

  /**
   * regenerates the socketUid and returns the new value
   */
  async regenerate(userId: string): Promise<string> {
    const newUid = uuidv4();
    await this.repository.update({ userId: Equal(userId) }, { socketUid: newUid })
    return newUid;
  }

  /**
   * gets the userId given the socketUid,
   * this transaction will validate that the authenticating key is valid
   * where null is a failed authentication
   */
  async validateAuthKey(id: string): Promise<string | null> {
    const res = await this.repository.findOne({
      where: { socketUid: Equal(id) },
      relations: ['userId'],
    })
    this.log.log(`entity response: ${JSON.stringify(res)}`)
    return res !== null ? res.userId.userId : null;
  }
}
