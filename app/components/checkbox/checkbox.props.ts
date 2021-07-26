import { ViewStyle } from 'react-native';

export interface CheckboxProps {
  style?: ViewStyle;
  onToggle?: (newValue: boolean) => void;
  checked?: boolean;
  value?: string;
  icon: any;
  checkedIcon: any;
}
