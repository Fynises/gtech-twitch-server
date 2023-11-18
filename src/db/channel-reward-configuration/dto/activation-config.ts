import { plainToInstance } from 'class-transformer';
import { PowerCurvesEnum } from './power-curves';

type ActivationModifierValue = string | number;

/**
 * object representing configuration of activation.\
 * to be stored as JSONB in postgres database
 */
export class ActivationConfig {
  /**
   * duration for how long the activation should last in seconds
   */
  duration: number;

  /**
   * the applied magnitude of the activation\
   * as an integer between 1-100 representing 1%-100%
   */
  power: number;

  /**
   * the power curve applied to activation
   */
  type: PowerCurvesEnum;

  /**
   * any additional modifiers for the activation power curve\
   * not all curves have modifiers
   */
  activationModifiers: Record<string, ActivationModifierValue> | null;

  static withDefaults(): ActivationConfig {
    const self: ActivationConfig = {
      duration: 5,
      power: 50,
      type: PowerCurvesEnum.Constant,
      activationModifiers: null,
    };
    return plainToInstance(ActivationConfig, self);
  }
}
