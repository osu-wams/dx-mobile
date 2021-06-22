import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Wallpaper } from '../../components';
import { ResourceCard } from '../../features';
import { color, SUBHEADER, LARGE_CONTENT, NORMAL_PADDING, FULL } from '../../theme';
import { usePerson, useResources } from '@osu-wams/hooks';

export const WelcomeScreen = function WelcomeScreen() {
  const resources = useResources();
  const person = usePerson();

  return (
    <View testID="WelcomeScreen" style={FULL}>
      {console.log(person)}
      <Wallpaper />
      <Screen style={NORMAL_PADDING} backgroundColor={color.transparent}>
        <Text style={SUBHEADER} tx="welcomeScreen.welcome" />
        <Text style={LARGE_CONTENT} tx="welcomeScreen.welcomeLong" />
        {resources.isSuccess && (
          <>
            <ResourceCard categ="Featured"></ResourceCard>
            <ResourceCard categ="Academic"></ResourceCard>
          </>
        )}
      </Screen>
    </View>
  );
};
