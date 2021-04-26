import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'

/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-__DEV__ mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 */
export function ToggleStorybook(props) {
  const [StorybookUIRoot, setStorybookUIRoot] = useState(null)

  useEffect(() => {
    console.log(Constants.manifest.extra)
    if (__DEV__ && Constants.manifest.extra.USE_STORYBOOK) {
      // Load the storybook UI once
      setStorybookUIRoot(() => require('./storybook').StorybookUIRoot)
    }
  }, [])

  if (StorybookUIRoot) {
    return StorybookUIRoot ? <StorybookUIRoot /> : null
  } else {
    return props.children
  }
}
