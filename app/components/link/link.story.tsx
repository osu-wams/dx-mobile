import * as React from 'react';
import { storiesOf } from '../../../storybook/decorators';
import { Story, UseCase } from '../../../storybook/views';
import { Text } from '../text/text';
import {
  ExternalLink,
  InternalLink,
  SimpleExternalLink,
  SimpleInternalLink,
  SimpleModalLink,
  HighlightExternalLink,
  LinkDivider,
} from './link';

storiesOf('Link').add('Behaviour', () => (
  <Story>
    <UseCase text="A link divider" usage="A nice visual queue to seperate multiple links">
      <LinkDivider />
    </UseCase>
    <UseCase text="An external link" usage="A link that opens a url in a browser.">
      <ExternalLink text="ExternalLink" />
      <ExternalLink fg={'blue'} text="ExternalLink with color" />
      <ExternalLink hideIcon={true} text="ExternalLink with hidden icon" />
    </UseCase>
    <UseCase
      text="An internal link"
      usage="A link that navigates to another screen in the application."
    >
      <InternalLink text="InternalLink" />
      <InternalLink fg={'blue'} text="InternalLink with color" />
      <InternalLink hideIcon={true} text="InternalLink with hidden icon" />
    </UseCase>
    <UseCase
      text="A simple internal link"
      usage="A link that navigates to another screen in the application."
    >
      <SimpleInternalLink text="SimpleInternalLink" />
      <SimpleInternalLink fg={'blue'} text="SimpleInternalLink with color" />
    </UseCase>
    <UseCase text="A simple external link" usage="A link that opens a url in a browser.">
      <SimpleExternalLink text="ExternalLink" />
      <SimpleInternalLink fg={'blue'} text="ExternalLink with color" />
    </UseCase>
    <UseCase text="A simple modal link" usage="A link that opens a modal.">
      <SimpleModalLink text="Link" />
    </UseCase>
    <UseCase
      text="A highlight external link"
      usage="A highlighted external link that opens a url in a browser."
    >
      <HighlightExternalLink text="Link" />
      <HighlightExternalLink fg="blue" text="Link with color" />
      <HighlightExternalLink hideIcon={true} text="Link with hidden icon" />
    </UseCase>
  </Story>
));
