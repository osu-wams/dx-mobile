import * as React from 'react';
import { FlatList, View, ViewStyle } from 'react-native';

export interface StoryProps {
  children?: React.ReactNode;
}

const ROOT: ViewStyle = { flex: 1 };

export function Story(props: StoryProps) {
  return (
    <View style={ROOT}>
      <FlatList
        data={[props.children]}
        renderItem={({ item }) => <>{item}</>}
        keyExtractor={(item, index) => `item-${index}`}
      />
    </View>
  );
}
