/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import Footer from './footer';
import { State } from '@osu-wams/hooks';

storiesOf('Footer').add('Default', () => (
  <Story>
    <UseCase text="Footer" usage="A regular footer.">
      <Footer />
    </UseCase>
  </Story>
));
