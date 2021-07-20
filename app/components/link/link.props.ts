import { Screens } from '../../navigators';

export interface LinkProps {
  children?: any;
  to?: { name: Screens; params: any };
  url?: string;
  fg?: string;
  hideIcon?: boolean;
  text: string;
  [x: string]: any;
}
export type LinkStyleProps = {
  fg?: string;
  bg?: string;
  padding?: number;
};
