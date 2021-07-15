/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { ImageStyle, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Icon } from './icon';
import { Color } from '@osu-wams/theme';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';

declare let module;

const style: ImageStyle | FontAwesomeIconStyle = {
  margin: 5,
};

const defaults = {
  color: Color.black,
  style,
  size: 26,
};

storiesOf('Icon', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase text="Images" usage="The icon for images.">
        <Icon iconName="back" {...defaults} />
        <Icon iconName="bullet" {...defaults} />
      </UseCase>
      <UseCase text="Logos" usage="The icons for osu services.">
        <Icon iconName="osu.logo-box-sync" {...defaults} />
        <Icon iconName="osu.logo-canvas" {...defaults} />
        <Icon iconName="osu.logo-drive" {...defaults} />
        <Icon iconName="osu.logo-gmail" {...defaults} />
        <Icon iconName="osu.logo-zoom" {...defaults} />
      </UseCase>
      <UseCase text="Font Awesome" usage="Some icons from Font Awesome.">
        <Icon iconName="fal.bong" {...defaults} />
        <Icon iconName="fab.bitcoin" {...defaults} />
      </UseCase>
      <UseCase text="With Counter" usage="Some icons with a counter.">
        <View style={{ width: 45 }}>
          <Icon iconName="fal.bong" count={420} {...defaults} />
        </View>
        <View style={{ width: 45, marginTop: 20 }}>
          <Icon iconName="fab.bitcoin" count={12} top={true} {...defaults} />
        </View>
      </UseCase>
    </Story>
  ));
