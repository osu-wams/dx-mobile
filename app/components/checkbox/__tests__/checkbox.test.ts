import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../checkbox.story');
    }, module),
  framework: 'react-native',
});
