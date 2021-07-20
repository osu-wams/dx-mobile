import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDollarSign, faGraduationCap, faStars } from '@fortawesome/pro-light-svg-icons';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { ResourceCard } from './ResourceCard';
import { rest } from 'msw';

declare let module;

storiesOf('Resource Card', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addParameters({
    msw: [
      rest.get('http://*', (req, res, ctx) => {
        console.warn(req.destination);
      }),
    ],
  })
  .add('Basic Usages', () => (
    <Story>
      <UseCase text="Featured Resources" usage="Resources card displaying featured resources.">
        <ResourceCard
          categ="featured"
          icon={<FontAwesomeIcon icon={faStars} size={28} color="black" />}
        />
      </UseCase>
      <UseCase text="Academic Resources" usage="Resources card displaying academic resources.">
        <ResourceCard
          categ="academic"
          icon={<FontAwesomeIcon icon={faGraduationCap} size={28} color="black" />}
        />
      </UseCase>
      <UseCase text="Financial Resources" usage="Resources card displaying financial resources.">
        <ResourceCard
          categ="financial"
          icon={<FontAwesomeIcon icon={faDollarSign} size={28} color="black" />}
        />
      </UseCase>
      <UseCase
        text="Employee Featured Resources"
        usage="Resources card displaying employee featured resources."
      >
        <ResourceCard
          categ="employee_featured"
          icon={<FontAwesomeIcon icon={faStars} size={28} color="black" />}
        />
      </UseCase>
    </Story>
  ))
  .add('Conditional Styles', () => (
    <Story>
      <UseCase text="Outage Warning" usage="A list of resources with some outage warnings.">
        <ResourceCard
          categ="featured"
          icon={<FontAwesomeIcon icon={faStars} size={28} color="black" />}
        />
      </UseCase>
    </Story>
  ));
