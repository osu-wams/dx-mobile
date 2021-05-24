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
import { RecoilRoot, useResetRecoilState, useRecoilState } from 'recoil';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
import { Loading } from './components/loading/loading';
import { Login } from './components/login/login';
import queryClient, { updateQueryClientOptions } from './utils/queryClient';
import { authState, applicationState } from './state';

enableScreens();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function Main() {
  const navigationRef = useRef<NavigationContainerRef>();
  const [appState, setAppState] = useRecoilState(applicationState);
  const auth = useAuth();
  const resetAuthState = useResetRecoilState(authState);

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  );

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    (async () => {
      await initFonts(); // expo
    })();
  }, []);

  useEffect(() => {
    if (auth?.jwt) {
      updateQueryClientOptions(queryClient, auth, resetAuthState);
      queryClient.clear();
      setTimeout(() => setAppState({ STATE: 'LOADED' }), 2500);
    }
  }, [auth]);

  if (auth.isAuthenticated && appState.STATE !== 'LOADED') return <Loading />;
  if (appState.STATE === 'BOOT' || (!auth.isAuthenticated && appState.STATE === 'LOADED')) {
    return <Login />;
  }

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ToggleStorybook>
  );
}

// RecoilRoot needs to wrap the full application component, since it contains and is initialized with state
// related hooks
export function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}

export default App;
