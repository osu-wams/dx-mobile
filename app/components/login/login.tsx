import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { applicationState } from '../../state';
import { Text, Button } from '..';
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
      <Button onPress={() => setAppState({ STATE: 'LOGIN' })}>
        <Text>Login</Text>
      </Button>
    </View>
  );
}
