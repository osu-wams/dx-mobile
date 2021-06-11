import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../text-field.story');
    }, module),
  framework: 'react-native',
});
