import * as React from 'react';
import { ImageStyle } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Icon } from './icon';
import { Color } from '../../../.yalc/@osu-wams/theme/dist';
import { FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';

declare let module;

const style: ImageStyle | FontAwesomeIconStyle = {
  margin: 5,
};

storiesOf('Icon', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Names', () => (
    <Story>
      <UseCase text="Images" usage="The icon for images.">
        <Icon iconName="back" color={Color.black} style={style} />
        <Icon iconName="bullet" color={Color.black} style={style} />
      </UseCase>
      <UseCase text="Logos" usage="The icons for osu services.">
        <Icon iconName="osu.logo-box-sync" color={Color.black} style={style} />
        <Icon iconName="osu.logo-canvas" color={Color.black} style={style} />
        <Icon iconName="osu.logo-drive" color={Color.black} style={style} />
        <Icon iconName="osu.logo-gmail" color={Color.black} style={style} />
        <Icon iconName="osu.logo-zoom" color={Color.black} style={style} />
      </UseCase>
      <UseCase text="Font Awesome" usage="Some icons from Font Awesome.">
        <Icon iconName="fal.bong" color={Color.black} style={style} />
        <Icon iconName="fab.bitcoin" color={Color.black} style={style} />
      </UseCase>
    </Story>
  ));
