import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Login } from './login';

declare let module;

storiesOf('Login', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Default" usage="The login component">
        <Login />
      </UseCase>
    </Story>
  ));
