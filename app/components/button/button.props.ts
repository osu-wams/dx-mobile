import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
export interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  text?: string;
  children?: React.ReactNode;
  bg?: string;
  fg?: string;
  btnSize?: 'small' | 'large';
}
