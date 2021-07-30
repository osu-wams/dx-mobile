/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OverviewScreen } from '../screens';
import { ResourcesScreen } from '../screens/resources/resources-screen';
import { Header, HEADER_NAV_HEIGHT } from '../ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames, PrimaryParamList } from './navigation-utilities';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>();

export function MainNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // eslint-disable-next-line react/display-name
        header: () => <Header />,
        headerTransparent: true,
        headerStyle: { height: insets.top + HEADER_NAV_HEIGHT },
      }}
      headerMode="float"
      initialRouteName={ScreenNames.Overview}
    >
      <Stack.Screen name={ScreenNames.Overview} component={OverviewScreen} />
      <Stack.Screen name={ScreenNames.Resources} component={ResourcesScreen} />
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = [ScreenNames.Overview];
export const canExit = (routeName: ScreenNames) => exitRoutes.includes(routeName);
