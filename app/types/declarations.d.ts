import { MOSTheme } from '@osu-wams/theme';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*.png';
declare module 'styled-components' {
  export interface DefaultTheme extends MOSTheme {}
}
