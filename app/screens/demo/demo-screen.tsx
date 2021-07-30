import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text, Screen } from '../../components';
import { spacing } from '../../theme';
export const heart = require('./heart.png');

const FULL: ViewStyle = { flex: 1 };
const BOLD: TextStyle = { fontWeight: 'bold' };
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: 'center',
  marginBottom: spacing[5],
};

export const DemoScreen = () => {
  return (
    <View testID="DemoScreen" style={FULL}>
      <Screen preset="scroll">
        <Text style={TITLE} preset="header" tx="demoScreen.title" />
      </Screen>
    </View>
  );
};
