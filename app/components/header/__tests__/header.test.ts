import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../header.story');
    }, module),
  framework: 'react-native',
});
