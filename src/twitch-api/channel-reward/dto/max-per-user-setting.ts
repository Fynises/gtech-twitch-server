import { Expose } from 'class-transformer';

/**
 * filename and interface abbreviated from max_per_user_per_stream_setting
 */
export class MaxPerUserSetting {
  @Expose({ name: 'is_enabled' })
  isEnabled: boolean;

  @Expose({ name: 'max_per_user_per_stream' })
  maxPerUserPerStream: number;
}
