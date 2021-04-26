import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from 'react-native'
import { color, spacing, typography } from './'

export const CENTRAL_LOGO: ImageStyle = {
  backgroundColor: 'transparent',
  marginTop: 45,
  marginBottom: 45,
  justifyContent: 'center',
  alignSelf: 'center',
}

export const NORMAL_PADDING: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const WHITE_TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

export const SUBHEADER: TextStyle = {
  ...WHITE_TEXT,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 26,
}

export const LARGE_CONTENT: TextStyle = {
  ...WHITE_TEXT,
  color: '#ffffff',
  fontSize: 24,
  lineHeight: 30,
  textAlign: 'center',
  marginHorizontal: 35,
  marginBottom: 0,
}

export const DISCLAIMER: TextStyle = {
  fontSize: 12,
}

export const FULL: ViewStyle = { flex: 1 }
