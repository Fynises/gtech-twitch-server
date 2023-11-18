import { HelixUser } from '@twurple/api';

export class UserDetailResponse {
  name: string;
  profile: string;

  constructor(user: HelixUser) {
    this.name = user.displayName;
    this.profile = user.profilePictureUrl;
  }
}
