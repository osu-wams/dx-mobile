import * as React from 'react';
import { ViewStyle, TextStyle, Alert } from 'react-native';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import { Button, CloseButton, ButtonLink } from './button';

const buttonStyleArray: ViewStyle[] = [{ width: 120 }, { borderRadius: 80 }];

const buttonTextStyleArray: TextStyle[] = [
  { fontSize: 20, fontWeight: '800' },
  { color: '#0ffeda' },
];

storiesOf('Button').add('Basic Usage', () => (
  <Story>
    <UseCase text="Primary" usage="The primary button.">
      <Button onPress={() => Alert.alert('pressed')} text="Button" />
    </UseCase>
    <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
      <Button onPress={() => Alert.alert('pressed')} disabled text="Button" />
    </UseCase>
    <UseCase text="Array Style" usage="Button with array style">
      <Button
        onPress={() => Alert.alert('pressed')}
        style={buttonStyleArray}
        textStyle={buttonTextStyleArray}
        text="Button"
      />
    </UseCase>
    <UseCase text="Close Button" usage="A close button.">
      <CloseButton onPress={() => Alert.alert('pressed')} />
    </UseCase>
    <UseCase text="Link Button" usage="A link button.">
      <ButtonLink onPress={() => Alert.alert('pressed')} text="Link" />
    </UseCase>
  </Story>
));
