import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelRewardConfigEntity } from './channel-reward-config.entity';
import { In, Repository } from 'typeorm';
import { ActivationConfig } from './dto/activation-config';
import { ChannelRewardDto } from './dto/channel-reward-dto';

@Injectable()
export class ChannelRewardConfigDbService {
  private readonly log = new Logger(ChannelRewardConfigDbService.name);
  constructor(
    @InjectRepository(ChannelRewardConfigEntity)
    private readonly repository: Repository<ChannelRewardConfigEntity>,
  ) {}

  async getSingle(id: string): Promise<ChannelRewardDto | null> {
    const res = await this.repository.findOneBy({
      channelRewardId: id,
    });
    return res !== null ? new ChannelRewardDto(res) : null;
  }

  async getConfigs(ids: string[]): Promise<ChannelRewardDto[]> {
    const res = await this.repository.findBy({
      channelRewardId: In(ids),
    });
    return res.map((element) => new ChannelRewardDto(element));
  }

  async deleteConfigurations(rewardIds: string[]): Promise<void> {
    await this.repository.delete({
      channelRewardId: In(rewardIds),
    });
  }

  async update(req: ChannelRewardDto): Promise<void> {
    const entity = this.repository.create({
      id: req.id,
      channelRewardId: req.channelRewardId,
      isEnabled: req.isEnabled,
      activationConfig: req.activationConfig,
    });
    await this.repository.save(entity);
  }

  /**
   * gets active rewardIds for a given user
   * @param userId associated userId
   */
  async getActiveRewards(userId: string): Promise<string[]> {
    const res = await this.repository.find({
      where: {
        userId: userId,
        isEnabled: true,
      },
    });
    return res.map((e) => e.channelRewardId);
  }

  /**
   * creates a new configuration and returns a data object containing the data
   * @param id associated channel reward id
   * @param userId user entity to create relation with
   */
  async createConfiguration(
    id: string,
    userId: string,
  ): Promise<ChannelRewardDto> {
    this.log.log(`creating configuration for id: ${id}`);
    // default values
    const entity = this.repository.create({
      channelRewardId: id,
      isEnabled: true,
      userId: userId,
      activationConfig: ActivationConfig.withDefaults(),
    });
    await this.repository.save(entity);
    return new ChannelRewardDto(entity);
  }
}
