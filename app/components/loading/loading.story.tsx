import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Loading } from './loading'

declare let module

storiesOf('Loading', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Default" usage="The circular logo loading component">
        <Loading />
      </UseCase>
    </Story>
  ))
