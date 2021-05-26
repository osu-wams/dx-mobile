import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Wallpaper } from '../../components';
import { color, SUBHEADER, LARGE_CONTENT, NORMAL_PADDING, FULL } from '../../theme';
import { useQuery } from 'react-query';
import { usePerson } from '@osu-wams/hooks';

export const WelcomeScreen = function WelcomeScreen() {
  const { isSuccess, data } = useQuery('/api/resources');
  const person = usePerson();

  return (
    <View testID="WelcomeScreen" style={FULL}>
      {console.log(person)}
      <Wallpaper />
      <Screen style={NORMAL_PADDING} backgroundColor={color.transparent}>
        <Text style={SUBHEADER} tx="welcomeScreen.welcome" />
        <Text style={LARGE_CONTENT} tx="welcomeScreen.welcomeLong" />
        <Text>{isSuccess && JSON.stringify(data)}</Text>
      </Screen>
    </View>
  );
};
