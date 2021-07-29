import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../footer.story');
    }, module),
  framework: 'react-native',
});
