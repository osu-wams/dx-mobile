import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { initFonts } from '../app/theme/fonts';

declare let module;

configure(() => {
  require('./storybook-registry');
}, module);

const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage: require('@react-native-async-storage/async-storage').default || null,
});

export function StorybookUIRoot() {
  const [fontsLoaded] = initFonts();

  if (!fontsLoaded) return null;

  return <StorybookUI />;
}
