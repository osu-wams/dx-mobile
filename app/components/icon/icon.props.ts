import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ImageStyle, ViewStyle } from 'react-native';

export interface IconProps {
  bg?: string;
  color?: string;
  containerStyle?: ViewStyle;
  count?: number;
  fontSize?: string;
  icon?: IconDefinition;
  iconName?: string;
  size?: number;
  style?: ImageStyle | FontAwesomeIconStyle;
}

export interface CounterProps {
  count?: number;
  top?: boolean;
}
