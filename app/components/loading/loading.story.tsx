import * as React from 'react';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import { Loading } from './loading';

storiesOf('Loading').add('Animated Spinner', () => (
  <Story>
    <UseCase
      text="Default"
      usage="An animated spinner to indicate that the application in loading and authenticating."
    >
      <Loading />
    </UseCase>
  </Story>
));
