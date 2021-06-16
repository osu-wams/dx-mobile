import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../resource-list-item.story');
    }, module),
  framework: 'react-native',
});
