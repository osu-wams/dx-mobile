/* eslint-disable camelcase */
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

export const initFonts = () => {
  const fonts = useFonts({
    OpenSans: OpenSans_400Regular,
    OpenSansBold: OpenSans_700Bold,
  });
  return fonts;
};
