import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AcademicsScreen,
  FinancesScreen,
  MenuScreen,
  OverviewScreen,
  ResourcesScreen,
  TrainingScreen,
} from '../screens';
import {
  faBox,
  faHome,
  faToolbox,
  faGraduationCap,
  faHandsUsd,
  faUsersClass,
  faList,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ThemeContext } from 'styled-components/native';
import { ScreenNames, PrimaryParamList } from './navigation-utilities';
import { useRecoilValue } from 'recoil';
import { State, User } from '@osu-wams/hooks';

const { getAffiliation, AFFILIATIONS } = User;

const Tab = createBottomTabNavigator<PrimaryParamList>();

export function MainNavigator() {
  const themeContext = useContext(ThemeContext);
  const user = useRecoilValue(State.userState);

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Overview}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color }) => {
          let icon;
          switch (route.name) {
            case ScreenNames.Academics:
              icon = faGraduationCap;
              break;
            case ScreenNames.Finances:
              icon = faHandsUsd;
              break;
            case ScreenNames.Menu:
              icon = faList;
              break;
            case ScreenNames.Overview:
              icon = faHome;
              break;
            case ScreenNames.Resources:
              icon = faToolbox;
              break;
            case ScreenNames.Training:
              icon = faUsersClass;
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
      <Tab.Screen name={ScreenNames.Overview} component={OverviewScreen} />
      {getAffiliation(user.data) === AFFILIATIONS.employee && (
        <>
          <Tab.Screen name={ScreenNames.Resources} component={ResourcesScreen} />
          <Tab.Screen name={ScreenNames.Training} component={TrainingScreen} />
        </>
      )}
      {getAffiliation(user.data) === AFFILIATIONS.student && (
        <>
          <Tab.Screen name={ScreenNames.Academics} component={AcademicsScreen} />
          <Tab.Screen name={ScreenNames.Finances} component={FinancesScreen} />
          <Tab.Screen name={ScreenNames.Menu} component={MenuScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

const exitRoutes = [ScreenNames.Overview];
export const canExit = (routeName: ScreenNames) => exitRoutes.includes(routeName);
