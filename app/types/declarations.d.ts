declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*.png';
declare module 'styled-components' {
  import { MOSTheme } from '@osu-wams/theme';
  export interface DefaultTheme extends MOSTheme {}
}
