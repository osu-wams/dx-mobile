// import 'storybook-addon-ondevice-styled-theme/register';
import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import * as stories from './storybook-registry';

declare let module;

configure(() => stories, module);

const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage: require('@react-native-async-storage/async-storage').default || null,
});

export const StorybookUIRoot = () => {
  return <StorybookUI />;
};
