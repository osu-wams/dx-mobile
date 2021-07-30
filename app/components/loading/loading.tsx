import React from 'react';
import { useWindowDimensions, View, Animated, Easing } from 'react-native';
import { presets } from './loading.presets';
import { LoadingProps } from './loading.props';
import Crest from '../logos/crest';

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
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
  const spin = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View testID="Loading" style={style}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Crest width={220} height={390} fill="black" viewBox={'0 0 62 79'} />
      </Animated.View>
    </View>
  );
}
