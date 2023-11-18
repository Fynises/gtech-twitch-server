import { Expose } from 'class-transformer';

export class MaxPerStreamSettings {
  @Expose({ name: 'is_enabled' })
  isEnabled: boolean;

  @Expose({ name: 'max_per_stream' })
  maxPerStream: number;
}
