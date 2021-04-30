import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Wallpaper } from '../../components';
import { color, SUBHEADER, LARGE_CONTENT, NORMAL_PADDING, FULL } from '../../theme';
import { useQuery } from 'react-query';

export const WelcomeScreen = function WelcomeScreen() {
  const { data } = useQuery('/resources');

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={NORMAL_PADDING} backgroundColor={color.transparent}>
        <Text style={SUBHEADER} tx="welcomeScreen.welcome" />
        <Text style={LARGE_CONTENT} tx="welcomeScreen.welcomeLong" />
        <Text>{JSON.stringify(data)}</Text>
      </Screen>
    </View>
  );
};
