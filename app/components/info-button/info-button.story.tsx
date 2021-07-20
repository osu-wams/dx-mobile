/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import InfoButton from './InfoButton';
import { State } from '@osu-wams/hooks';

storiesOf('InfoButton').add('Names', () => (
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
