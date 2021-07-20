import * as React from 'react';
import { faDollarSign, faGraduationCap, faStars } from '@fortawesome/pro-light-svg-icons';
import { Story, UseCase } from '../../../storybook/views';
import { ResourceCard } from './ResourceCard';
import { rest } from 'msw';
import { storiesOf } from '../../../storybook/decorators';

storiesOf('Resource Card')
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
        <ResourceCard collapsing={false} categ="featured" icon={faStars} />
      </UseCase>
      <UseCase text="Academic Resources" usage="Resources card displaying academic resources.">
        <ResourceCard collapsing={true} categ="academic" icon={faGraduationCap} />
      </UseCase>
      <UseCase text="Financial Resources" usage="Resources card displaying financial resources.">
        <ResourceCard collapsing={true} categ="financial" icon={faDollarSign} />
      </UseCase>
      <UseCase
        text="Employee Featured Resources"
        usage="Resources card displaying employee featured resources."
      >
        <ResourceCard collapsing={true} categ="employee_featured" icon={faStars} />
      </UseCase>
    </Story>
  ))
  .add('Conditional Styles', () => (
    <Story>
      <UseCase text="Outage Warning" usage="A list of resources with some outage warnings.">
        <ResourceCard collapsing={true} categ="featured" icon={faStars} />
      </UseCase>
    </Story>
  ));
