import { HelixCustomReward } from '@twurple/api';

/**
 * object representing JSON used in channel reward response
 */
export class CustomRewardResponseData {
  id: string;
  image: string;
  backgroundColor: string;
  title: string;
  isEnabled: boolean;

  /**
   * constructor to be used in the context of creating a json response only
   */
  constructor(data: HelixCustomReward) {
    this.id = data.id;
    this.image = data.getImageUrl(2);
    this.backgroundColor = data.backgroundColor;
    this.title = data.title;
    this.isEnabled = data.isEnabled;
  }
}
