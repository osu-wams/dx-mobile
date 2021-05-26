import { ViewStyle } from 'react-native';
import { LoginPresets } from './login.presets';

export interface LoginProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;

  preset?: LoginPresets;
}
