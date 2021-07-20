import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../app/utils/queryClient';
import { ThemeProvider } from 'styled-components/native';
import { storiesOf as storybookStoriesOf } from '@storybook/react-native';
import { StoryScreen } from './views';
import { themesLookup } from '@osu-wams/theme';

declare let module;

export const storiesOf = (name: string) =>
  storybookStoriesOf(name, module).addDecorator((fn) => {
    queryClient.setDefaultOptions({
      queries: {
        enabled: true,
      },
    });

    return (
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ThemeProvider theme={themesLookup.light}>
          <StoryScreen>{fn()}</StoryScreen>
        </ThemeProvider>
      </QueryClientProvider>
    );
  });
