import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing, typography } from '../../theme'

export const INTRO_BUTTON: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[3],
  backgroundColor: 'transparent',
}

export const INTRO_BUTTON_PRIMARY: ViewStyle = {
  ...INTRO_BUTTON,
  borderWidth: 3,
  borderColor: color.primary,
}
export const INTRO_BUTTON_TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: 'bold',
  fontSize: 18,
  letterSpacing: 1,
}
