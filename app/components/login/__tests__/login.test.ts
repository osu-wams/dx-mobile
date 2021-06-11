import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../login.story');
    }, module),
  framework: 'react-native',
});
