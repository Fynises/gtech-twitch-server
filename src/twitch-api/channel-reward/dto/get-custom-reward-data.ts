import { Expose, Type } from 'class-transformer';
import { GlobalCooldownSetting } from './global-cooldown-setting';
import { MaxPerStreamSettings } from './max-per-stream-settings';
import { MaxPerUserSetting } from './max-per-user-setting';

export class GetCustomRewardData {
  @Expose({ name: 'broadcaster_name' })
  broadcasterName: string;

  @Expose({ name: 'broadcaster_login' })
  broadcasterLogin: string;

  @Expose({ name: 'broadcaster_id' })
  broadcasterId: string;

  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'image' })
  image: Record<string, string | null>;

  @Expose({ name: 'background_color' })
  backgroundColor: string;

  @Expose({ name: 'is_enabled' })
  isEnabled: boolean;

  @Expose({ name: 'cost' })
  cost: number;

  @Expose({ name: 'title' })
  title: string;

  @Expose({ name: 'prompt' })
  prompt: string;

  @Expose({ name: 'max_per_stream_setting' })
  @Type(() => MaxPerStreamSettings)
  maxPerStreamSetting: MaxPerStreamSettings;

  @Expose({ name: 'max_per_user_per_stream_setting' })
  @Type(() => MaxPerUserSetting)
  maxPerUserPerStreamSetting: MaxPerUserSetting;

  @Expose({ name: 'global_cooldown_setting' })
  @Type(() => GlobalCooldownSetting)
  globalCooldownSetting: GlobalCooldownSetting;

  @Expose({ name: 'is_paused' })
  isPaused: boolean;

  @Expose({ name: 'is_in_sock' })
  isInStock: boolean;

  @Expose({ name: 'default_image' })
  defaultImage: Record<string, string | null>;

  @Expose({ name: 'should_redemption_skip_request_queue' })
  shouldRedemptionsSkipRequestQueue: boolean;

  @Expose({ name: 'redemptions_redeemed_current_stream' })
  redemptionsRedeemedCurrentStream: number | null;

  @Expose({ name: 'cooldown_expires_at' })
  cooldownExpiresAt: string | null;
}
