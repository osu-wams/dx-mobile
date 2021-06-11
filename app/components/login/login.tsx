import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { applicationState } from '../../state';
import { Button } from '../button/button';
import { INTRO_BUTTON_TEXT } from '../button/buttons.styles';
import { presets } from './login.presets';
import { LoginProps } from './login.props';

export function Login(props: LoginProps) {
  const setAppState = useSetRecoilState(applicationState);
  const { height, width } = useWindowDimensions();
  // grab the props
  const { preset = 'basic', style: styleOverride } = props;

  // assemble the style
  const presetToUse = presets[preset] || presets.basic;
  const style = { ...presetToUse, ...styleOverride, ...{ height, width } };

  return (
    <View testID="Login" style={style}>
      <Button
        text="Login"
        textStyle={INTRO_BUTTON_TEXT}
        preset="primary"
        onPress={() => setAppState({ STATE: 'LOGIN' })}
      />
    </View>
  );
}
