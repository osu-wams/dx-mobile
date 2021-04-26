import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, LogoCircular, Screen, Text, Wallpaper } from '../../components'
import {
  color,
  CENTRAL_LOGO,
  SUBHEADER,
  LARGE_CONTENT,
  NORMAL_PADDING,
  DISCLAIMER,
  FULL,
} from '../../theme'
import {
  INTRO_BUTTON,
  INTRO_BUTTON_PRIMARY,
  INTRO_BUTTON_TEXT,
} from '../../components/button/buttons.styles'

export const WelcomeScreen = function WelcomeScreen() {
  const navigation = useNavigation()
  const signInScreen = () => navigation.navigate('signIn')
  const underAgeScreen = () => navigation.navigate('underAge')

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={NORMAL_PADDING} backgroundColor={color.transparent}>
        <LogoCircular style={CENTRAL_LOGO} />
        <Text style={SUBHEADER} tx="welcomeScreen.welcome" />
        <Text style={LARGE_CONTENT} tx="welcomeScreen.welcomeLong" />
      </Screen>
      <SafeAreaView>
        <View style={NORMAL_PADDING}>
          <Button
            testID="next-screen-button"
            style={INTRO_BUTTON_PRIMARY}
            textStyle={INTRO_BUTTON_TEXT}
            tx="welcomeScreen.over"
            onPress={signInScreen}
          />
          <Button
            style={{ marginTop: 12, marginBottom: 20, ...INTRO_BUTTON }}
            textStyle={INTRO_BUTTON_TEXT}
            tx="welcomeScreen.under"
            onPress={underAgeScreen}
          />
          <Text style={DISCLAIMER}>
            By using this app, you are agreeing to the Terms of Use and Privacy Policy.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}
