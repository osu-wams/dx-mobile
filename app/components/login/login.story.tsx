import * as React from 'react';
import { Story, UseCase } from '../../../storybook/views';
import { Login } from './login';
import { storiesOf } from '../../../storybook/decorators';

storiesOf('Login').add('Login Button', () => (
  <Story>
    <UseCase
      text="Default"
      usage="A component used to initiate a SAML authentication login process."
    >
      <Login />
    </UseCase>
  </Story>
));
