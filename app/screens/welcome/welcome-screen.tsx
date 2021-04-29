import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Wallpaper } from '../../components';
import { color, SUBHEADER, LARGE_CONTENT, NORMAL_PADDING, FULL } from '../../theme';

export const WelcomeScreen = function WelcomeScreen() {
  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={NORMAL_PADDING} backgroundColor={color.transparent}>
        <Text style={SUBHEADER} tx="welcomeScreen.welcome" />
        <Text style={LARGE_CONTENT} tx="welcomeScreen.welcomeLong" />
      </Screen>
    </View>
  );
};
