import { HelixCustomReward } from '@twurple/api';
import { CustomRewardResponseData } from './custom-reward-response-data';

/**
 * Object representing a JSON response to be used by the get-all API
 */
export class CustomRewardResponse {
  data: CustomRewardResponseData[];

  /**
   * constructor to be used in the context of creating a JSON response only
   */
  constructor(data: HelixCustomReward[]) {
    this.data = data.map((e) => new CustomRewardResponseData(e));
  }
}
