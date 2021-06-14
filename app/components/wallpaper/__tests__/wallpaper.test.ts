import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../wallpaper.story');
    }, module),
  framework: 'react-native',
});
