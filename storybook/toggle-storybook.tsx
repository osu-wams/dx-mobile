import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { StorybookUIRoot as Root } from '.';
import { initFonts } from '../app/theme/fonts';

/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-__DEV__ mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 */
export function ToggleStorybook(props) {
  const [StorybookUIRoot, setStorybookUIRoot] = useState(null);
  const [fontsLoaded] = initFonts();

  useEffect(() => {
    if (__DEV__ && Constants.manifest.extra.USE_STORYBOOK && fontsLoaded) {
      // Load the storybook UI once
      setStorybookUIRoot(Root);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (StorybookUIRoot) {
    return StorybookUIRoot;
  } else {
    return props.children;
  }
}
