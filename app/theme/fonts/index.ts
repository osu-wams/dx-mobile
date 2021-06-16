import * as Font from 'expo-font';

export const initFonts = () => {
  const fonts = Font.useFonts({
    OpenSans: require('./open_sans/OpenSans-Regular.ttf'),
  });
  return fonts;
};
