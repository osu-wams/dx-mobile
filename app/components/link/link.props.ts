import { TextStyle } from 'react-native';
import { Screens } from '../../navigators';

export interface LinkProps {
  children?: any;
  to?: { name: Screens; params: any };
  url?: string;
  fg?: string;
  hideIcon?: boolean;
  text: string;
  textStyle?: TextStyle;
  noFlex?: boolean;
  [x: string]: any;
}
export type LinkStyleProps = {
  fg?: string;
  bg?: string;
  padding?: number;
  flexDirection?: 'column' | 'row';
  noFlex?: boolean;
};
