import { ViewStyle } from 'react-native';
import { palette } from '../../theme/palette';

const BASE: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: palette.grayDarker,
  alignItems: 'center',
  justifyContent: 'center',
};

export const presets = {
  basic: {
    ...BASE,
  } as ViewStyle,
};

/**
 * A list of preset names.
 */
export type LoginPresets = keyof typeof presets;
