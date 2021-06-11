import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../icon.story');
    }, module),
  framework: 'react-native',
});
