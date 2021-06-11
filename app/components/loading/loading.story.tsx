import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Loading } from './loading';

declare let module;

storiesOf('Loading', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Animated Spinner', () => (
    <Story>
      <UseCase
        text="Default"
        usage="An animated spinner to indicate that the application in loading and authenticating."
      >
        <Loading />
      </UseCase>
    </Story>
  ));
