import initStoryshots from '@storybook/addon-storyshots';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../loading.story');
    }, module),
  framework: 'react-native',
});
