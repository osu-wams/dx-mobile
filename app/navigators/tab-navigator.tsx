import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WelcomeScreen, DemoScreen } from '../screens';
import { ResourcesScreen } from '../screens/resources/resources-screen';
import { faBone, faBox, faHome, faToolbox } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ThemeContext } from 'styled-components/native';
import { ScreenNames, PrimaryParamList } from './navigation-utilities';

const Tab = createBottomTabNavigator<PrimaryParamList>();

export function MainNavigator() {
  const themeContext = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Welcome}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color }) => {
          let icon;
          switch (route.name) {
            case ScreenNames.Welcome:
              icon = faHome;
              break;
            case ScreenNames.Resources:
              icon = faToolbox;
              break;
            case ScreenNames.Demo:
              icon = faBone;
              break;
            default:
              icon = faBox;
              break;
          }
          return <FontAwesomeIcon icon={icon} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: themeContext.header.mainNavList.hoverColor,
        inactiveTintColor: themeContext.header.mainNavList.color,
        activeBackgroundColor: themeContext.header.background,
        inactiveBackgroundColor: themeContext.header.background,
        style: {
          backgroundColor: themeContext.header.background,
        },
      }}
    >
      <Tab.Screen name={ScreenNames.Welcome} component={WelcomeScreen} />
      <Tab.Screen name={ScreenNames.Resources} component={ResourcesScreen} />
      <Tab.Screen name={ScreenNames.Demo} component={DemoScreen} />
    </Tab.Navigator>
  );
}

const exitRoutes = [ScreenNames.Welcome];
export const canExit = (routeName: ScreenNames) => exitRoutes.includes(routeName);
