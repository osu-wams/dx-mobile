import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Card } from './Card';
// import { FeatureCard, FeatureCardContent, FeatureCardHeader } from './variants/FeatureCard';
import CardHeader, { CardHeaderSimple } from './CardHeader';
import CardContent from './CardContent';
import { Text } from '../text/text';
import { Badge } from './StyledCardComponents';
import { Color } from '@osu-wams/theme';
import { Icon } from '../icon/icon';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import CardFooter from './CardFooter';

declare let module;

const Content = (props?: any) => (
  <CardContent {...props}>
    <Text>Test</Text>
  </CardContent>
);

const Footer = (props?: any) => (
  <CardFooter {...props}>
    <Text>Footer</Text>
  </CardFooter>
);

storiesOf('Card', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Basic', () => (
    <Story>
      <UseCase
        text="Collapsible Card"
        usage="A basic card that collapse or expand content."
        noBackground={true}
      >
        <Card>
          <CardHeader
            title="Card Title: Collapsible"
            badge={<Icon icon={faUserCircle} size={24} />}
          />
          {Content()}
          {Footer()}
        </Card>
      </UseCase>
      <UseCase
        text="Non-Collapsible Card"
        usage="A basic card that does not collapse or expand content."
        noBackground={true}
      >
        <Card collapsing={false}>
          <CardHeader
            title="Card Title: Non-Collapsible"
            badge={<Icon icon={faUserCircle} size={24} />}
          />
          {Content()}
          {Footer()}
        </Card>
      </UseCase>
      <UseCase
        text="Collapsible Card with a Badge or Icon"
        usage="A basic card that collapse or expand content with a badge."
        noBackground={true}
      >
        <Card collapsing>
          <CardHeader title="Card Title: Icon" badge={<Icon icon={faUserCircle} size={24} />} />
          {Content()}
          {Footer()}
        </Card>
        <Card>
          <CardHeader
            title="Card Title: Badge"
            badge={
              <Badge bg={Color['orange-400']} fg={Color.white}>
                <Text style={{ color: Color.white }}>4</Text>
              </Badge>
            }
          />
          {Content()}
          {Footer()}
        </Card>
      </UseCase>
      <UseCase
        text="Collapsible Card with an Icon and Counter"
        usage="A basic card that collapse or expand content with an icon and counter."
        noBackground={true}
      >
        <Card>
          <CardHeader
            title="Card Title: Icon with Counter"
            badge={<Icon icon={faUserCircle} count={3} size={24} />}
          />
          {Content()}
          {Footer()}
        </Card>
        <Card>
          <CardHeader
            title="Card Title: Icon with Counter"
            badge={<Icon icon={faUserCircle} count={3} size={24} top={true} />}
          />
          {Content()}
          {Footer()}
        </Card>
      </UseCase>
      <UseCase
        text="Simple Card Header"
        usage="A card with only a simple header and no content, see ITSystemStatus"
        noBackground={true}
      >
        <Card>
          <CardHeaderSimple>
            <Text>Non-Content Simple Card</Text>
          </CardHeaderSimple>
        </Card>
      </UseCase>
    </Story>
  ));
