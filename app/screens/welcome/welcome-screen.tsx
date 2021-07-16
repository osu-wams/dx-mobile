import React from 'react';
import { Screen } from '../../components';
import { ResourceCard } from '../../features';
import { usePerson, useResources } from '@osu-wams/hooks';
import { Body } from '../../ui/Body';

export const WelcomeScreen = function WelcomeScreen() {
  const resources = useResources();
  const person = usePerson();

  return (
    <Screen>
      <Body>
        {resources.isSuccess && (
          <>
            <ResourceCard categ="Featured"></ResourceCard>
            <ResourceCard categ="Academic"></ResourceCard>
          </>
        )}
      </Body>
    </Screen>
  );
};
