import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Login } from './login';

declare let module;

storiesOf('Login', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Login Button', () => (
    <Story>
      <UseCase
        text="Default"
        usage="A component used to initiate a SAML authentication login process."
      >
        <Login />
      </UseCase>
    </Story>
  ));
