import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../switch.story');
    }, module),
  framework: 'react-native',
});
