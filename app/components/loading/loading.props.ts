import { ViewStyle } from 'react-native'
import { LoadingPresets } from './loading.presets'

export interface LoadingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  preset?: LoadingPresets
}
