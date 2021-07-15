import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans';

export const initFonts = () => {
  const fonts = useFonts({
    OpenSans: OpenSans_400Regular,
  });
  return fonts;
};
