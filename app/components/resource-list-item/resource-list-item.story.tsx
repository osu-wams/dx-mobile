/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { ResourceListItem } from './resource-list-item';
import { Resources } from '@osu-wams/hooks';

declare let module;

const testResource = Resources.mockResources.resourcesData.data[0];
const operationalSystem = { name: 'OSU Websites', status: 1, statusText: 'Status Text' };
const outageSystem = { name: 'OSU Websites', status: 0, statusText: 'Status Text' };

storiesOf('ResourceListItem', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behaviour', () => (
    <Story>
      <UseCase text="Basic Resource List Item" usage="">
        <ResourceListItem
          resource={testResource}
          eventAction="test"
          eventCategory="test"
          itStatus={{ isSuccess: true, data: [operationalSystem] }}
        />
      </UseCase>
      <UseCase text="Resource List Item with an IT System Outage" usage="">
        <ResourceListItem
          resource={testResource}
          eventAction="test"
          eventCategory="test"
          itStatus={{ isSuccess: true, data: [outageSystem] }}
        />
      </UseCase>
    </Story>
  ));
