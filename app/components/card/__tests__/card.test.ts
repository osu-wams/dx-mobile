import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../card.story');
    }, module),
  framework: 'react-native',
});
