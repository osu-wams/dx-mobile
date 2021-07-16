import React from 'react';
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BulletItem, Button, Header, Text, Screen } from '../../components';
import { color, spacing } from '../../theme';
export const heart = require('./heart.png');

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: '#5D2555',
};
const BOLD: TextStyle = { fontWeight: 'bold' };
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
};
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: 'center',
  letterSpacing: 1.5,
};
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: 'center',
  marginBottom: spacing[5],
};
const TAGLINE: TextStyle = {
  color: '#BAB6C8',
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
};
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: 'contain',
};
const DISCLOSURE: TextStyle = {
  color: '#BAB6C8',
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
};

const platformCommand = Platform.select({
  ios: 'Cmd + D',
  android: 'Cmd/Ctrl + M',
});

export const DemoScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <View testID="DemoScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={TITLE} preset="header" tx="demoScreen.title" />
        <Text style={TAGLINE} tx="demoScreen.tagLine" />
        <BulletItem text="Integrated here, Navigation with State, TypeScript, Storybook, Solidarity, and i18n." />
        <BulletItem
          text={`To run Storybook, press ${platformCommand} or shake the device to show the developer menu, then select "Toggle Storybook"`}
        />
        <Button style={DEMO} onPress={() => navigation.navigate('welcome')} />
      </Screen>
    </View>
  );
};
