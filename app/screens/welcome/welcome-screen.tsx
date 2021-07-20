import React from 'react';
import { Screen } from '../../components';
import { ResourceCard } from '../../features';
import { usePerson, useResources } from '@osu-wams/hooks';
import { Body } from '../../ui/Body';
import { faGraduationCap, faStars } from '@fortawesome/pro-light-svg-icons';

export const WelcomeScreen = function WelcomeScreen() {
  const resources = useResources();
  const person = usePerson();

  return (
    <Screen>
      <Body>
        {resources.isSuccess && (
          <>
            <ResourceCard categ="Featured" icon={faStars} collapsing={false} />
            <ResourceCard categ="Academic" icon={faGraduationCap} collapsing={false} />
          </>
        )}
      </Body>
    </Screen>
  );
};
