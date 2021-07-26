import React, { useEffect } from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import { useResetRecoilState } from 'recoil';
import { useAuth } from '../../app/hooks/useAuth';
import queryClient, { updateQueryClientOptions } from '../../app/utils/queryClient';
import { authState } from '../../app/state';

export interface StoryProps {
  children?: React.ReactNode;
}

const ROOT: ViewStyle = { flex: 1 };

export function Story({ children }: StoryProps) {
  const auth = useAuth();
  const resetAuthState = useResetRecoilState(authState);

  useEffect(() => {
    if (auth?.jwt) {
      updateQueryClientOptions(queryClient, auth, resetAuthState);
      queryClient.clear();
    }
  }, [auth]);
  return (
    <View style={ROOT}>
      <FlatList
        data={[children]}
        renderItem={({ item }) => <>{item}</>}
        keyExtractor={(item, index) => `story-item-${index}`}
      />
    </View>
  );
}
