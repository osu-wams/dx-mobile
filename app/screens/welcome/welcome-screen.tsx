import React from 'react';
import { Screen } from '../../components';
import { ResourceCard } from '../../features';
import { usePerson, useResources } from '@osu-wams/hooks';
import { Body } from '../../ui/Body';
import { faGraduationCap, faStars } from '@fortawesome/pro-light-svg-icons';
import Footer from '../../components/footer/footer';

export const WelcomeScreen = function WelcomeScreen() {
  const resources = useResources();
  const person = usePerson();

  return (
    <Screen preset="scroll" key="welcome-screen">
      <Body key="welcome-body">
        {person.isSuccess && resources.isSuccess && resources.data.length > 0 && (
          <>
            <ResourceCard categ="Featured" icon={faStars} collapsing={false} key="featured-card" />
            <ResourceCard
              categ="Academic"
              icon={faGraduationCap}
              collapsing={false}
              key="academic-card"
            />
          </>
        )}
      </Body>
      <Footer />
    </Screen>
  );
};
