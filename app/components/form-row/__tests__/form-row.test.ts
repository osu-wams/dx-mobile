import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../form-row.story');
    }, module),
  framework: 'react-native',
});
