import { Expose } from 'class-transformer';

export class GlobalCooldownSetting {
  @Expose({ name: 'is_enabled' })
  isEnabled: string;

  @Expose({ name: 'global_cooldown_seconds' })
  globalCooldownSeconds: number;
}
