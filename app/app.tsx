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
import './i18n'
import './utils/ignore-warnings'
import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { initFonts } from './theme/fonts' // expo
import { storage } from './utils/storage'
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from './navigators'
import { ToggleStorybook } from '../storybook/toggle-storybook'
import { QueryClientProvider } from 'react-query'
import useAuth from './hooks/useAuth'
import { RecoilRoot } from 'recoil'

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens'
import { Loading } from './components/loading/loading'
import queryClient, { authQueryClient } from './utils/queryClient'

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'

/**
 * This is the root component of our app.
 */
function Main() {
  const navigationRef = useRef<NavigationContainerRef>()
  const [isLoaded, setIsLoaded] = useState(false)
  const auth = useAuth()

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await initFonts() // expo
    })()
  }, [])

  useEffect(() => {
    if (auth?.jwt) {
      authQueryClient(queryClient, auth)
      queryClient.clear()
      setTimeout(() => setIsLoaded(true), 2500)
    }
  }, [auth])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!isLoaded) return <Loading />

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ToggleStorybook>
  )
}

// RecoilRoot needs to wrap the full application component, since it contains and is initialized with state
// related hooks
export function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  )
}

export default App
