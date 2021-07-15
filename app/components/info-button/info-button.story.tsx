/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import InfoButton from './InfoButton';
import { State } from '@osu-wams/hooks';

declare let module;

storiesOf('InfoButton', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase
        text="Information Button"
        usage="A regular information button."
        initialState={[
          {
            atom: State.infoButtonState,
            state: [
              {
                id: '123',
                content: 'Info button body content goes here.',
                title: 'Information Button Title',
              },
            ],
          },
        ]}
      >
        <InfoButton infoButtonId="123" />
      </UseCase>
    </Story>
  ));
