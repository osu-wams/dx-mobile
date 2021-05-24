import React from 'react';
import { useWindowDimensions, View, Animated, Easing, Text } from 'react-native';
// import { LogoCircular } from '../logo-circular/logo-circular'
import { presets } from './loading.presets';
import { LoadingProps } from './loading.props';

export function Loading(props: LoadingProps) {
  const { height, width } = useWindowDimensions();
  // grab the props
  const { preset = 'basic', style: styleOverride } = props;

  // assemble the style
  const presetToUse = presets[preset] || presets.basic;
  const style = { ...presetToUse, ...styleOverride, ...{ height, width } };

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 9000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
  const spin = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View testID="Loading" style={style}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Text style={{ fontSize: 45 }}>Logo</Text>
      </Animated.View>
    </View>
  );
}
