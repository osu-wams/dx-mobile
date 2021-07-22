import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../app/utils/queryClient';
import { ThemeProvider } from 'styled-components/native';
import { storiesOf as storybookStoriesOf } from '@storybook/react-native';
import { StoryScreen } from './views';
import { themesLookup } from '@osu-wams/theme';
import { RecoilRoot } from 'recoil';

declare let module;

export const storiesOf = (name: string) =>
  storybookStoriesOf(name, module).addDecorator((fn) => {
    queryClient.setDefaultOptions({
      queries: {
        enabled: true,
      },
    });

    // Storybook Jest tests require RecoilRoot parent, while Storybook for development does not work
    // with an added RecoilRoot (see use-case.tsx)
    return __TEST__ ? (
      <RecoilRoot>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <ThemeProvider theme={themesLookup.light}>
            <StoryScreen>{fn()}</StoryScreen>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    ) : (
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ThemeProvider theme={themesLookup.light}>
          <StoryScreen>{fn()}</StoryScreen>
        </ThemeProvider>
      </QueryClientProvider>
    );
  });
