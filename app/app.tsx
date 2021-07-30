/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n';
import './utils/ignore-warnings';
import 'react-native-get-random-values';
import React, { useEffect, useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { initFonts } from './theme/fonts'; // expo
import { storage } from './utils/storage';
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from './navigators';
import { ToggleStorybook } from '../storybook/toggle-storybook';
import { QueryClientProvider } from 'react-query';
import useAuth from './hooks/useAuth';
import { RecoilRoot, useResetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { Types } from '@osu-wams/lib';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
import { Loading } from './components/loading/loading';
import { Login } from './components/login/login';
import queryClient, { updateQueryClientOptions } from './utils/queryClient';
import { authState, applicationState } from './state';
import { ThemeProvider } from 'styled-components/native';
import { themesLookup } from '@osu-wams/theme';
import { State } from '@osu-wams/hooks';
import { Header } from './ui/Header';
import { StatusBar } from 'expo-status-bar';

enableScreens();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
const { userState, themeState } = State;

/**
 * This is the root component of our app.
 */
function Main() {
  const navigationRef = useRef<NavigationContainerRef>();
  const [appState, setAppState] = useRecoilState(applicationState);
  const auth = useAuth();
  const resetAuthState = useResetRecoilState(authState);
  const [fontsLoaded] = initFonts();
  const [theme, setTheme] = useRecoilState<string>(themeState);
  const user = useRecoilValue<Types.UserState>(userState);

  // TODO: This depends on a browser, see ticket MMA-8 for work to be done
  // useUserState(() => ({}));
  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  );

  useEffect(() => {
    if (auth?.jwt) {
      updateQueryClientOptions(queryClient, auth, resetAuthState);
      queryClient.clear();
      setTimeout(() => setAppState({ STATE: 'LOADED' }), 2500);
    }
  }, [auth]);

  /**
   * Targets Theme.tsx shared user state modifications
   */
  useEffect(() => {
    setTheme(user.data?.theme || theme);
  }, [theme, user.data.theme]);

  if (!fontsLoaded) return null;
  if (auth.isAuthenticated && appState.STATE !== 'LOADED') return <Loading />;
  if (appState.STATE === 'BOOT' || (!auth.isAuthenticated && appState.STATE === 'LOADED')) {
    return (
      <ThemeProvider theme={themesLookup[theme]}>
        <Login />
      </ThemeProvider>
    );
  }

  // otherwise, we're ready to render the app
  return (
    <ThemeProvider theme={themesLookup[theme]}>
      <ToggleStorybook>
        <SafeAreaProvider
          style={{ backgroundColor: themesLookup[theme].header.background }}
          initialMetrics={initialWindowMetrics}
        >
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <Header />
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </ToggleStorybook>
    </ThemeProvider>
  );
}

// RecoilRoot needs to wrap the full application component, since it contains and is initialized with state
// related hooks
export function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Main />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
