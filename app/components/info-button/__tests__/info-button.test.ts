import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../info-button.story');
    }, module),
  framework: 'react-native',
});
