import * as React from 'react';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import { Wallpaper } from './wallpaper';

storiesOf('Wallpaper').add('Style Presets', () => (
  <Story>
    <UseCase text="default/stretch" usage="Full screen wallpaper image.">
      <Wallpaper />
    </UseCase>
  </Story>
));
