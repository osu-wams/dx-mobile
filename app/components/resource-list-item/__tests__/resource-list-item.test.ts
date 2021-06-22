/*
import initStoryshots from '@storybook/addon-storyshots';

TODO: Disabled due to react-native-gesture-handler bug with jest
https://github.com/software-mansion/react-native-gesture-handler/issues/344
...
The above error occurred in the <NativeViewGestureHandler> component:
...
Unable to find node on an unmounted component.
...

initStoryshots({
  config: ({ configure }) =>
    configure(() => {
      require('../resource-list-item.story');
    }, module),
  framework: 'react-native',
});
*/

describe('resource-list-item', () => {
  it('is not tested', async () => {
    expect(true).toBeTruthy();
  });
});
