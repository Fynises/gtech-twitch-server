import { Type } from 'class-transformer';
import { GetCustomRewardData } from './get-custom-reward-data';

export class GetCustomReward {
  @Type(() => GetCustomRewardData)
  data: GetCustomRewardData[];
}
