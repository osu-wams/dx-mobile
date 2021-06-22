import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { ImageStyle, ViewStyle } from 'react-native';

export interface IconProps {
  color: string;
  icon?: IconDefinition;
  size?: number;
  iconName?: string;
  style?: ImageStyle | FontAwesomeIconStyle;
  containerStyle?: ViewStyle;
}
