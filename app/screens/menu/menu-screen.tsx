import React from 'react';
import { Screen, Text } from '../../components';
import { Body } from '../../ui/Body';

export const MenuScreen = ({ navigation }) => {
  return (
    <Screen preset="scroll">
      <Body>
        <Text onPress={() => navigation.goBack()}>Go back</Text>
        <Text>This is the screen.</Text>
      </Body>
    </Screen>
  );
};
