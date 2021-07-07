import { MOSTheme } from '@osu-wams/theme';
<<<<<<< HEAD
=======

>>>>>>> 28eec6e (extends DefaultTheme to be MOSTheme)
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*.png';
<<<<<<< HEAD
=======

>>>>>>> 28eec6e (extends DefaultTheme to be MOSTheme)
declare module 'styled-components' {
  export interface DefaultTheme extends MOSTheme {}
}
