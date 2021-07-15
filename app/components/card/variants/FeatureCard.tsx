import styled from 'styled-components/native';
import { CardButtonBase } from '../StyledCardComponents';
import { spacing } from '@osu-wams/theme';
import { Text } from '../../text/text';
import { WebView } from 'react-native-webview';
import { FeaturedCardProps } from '../card.props';

const FeatureCard = styled(CardButtonBase)<FeaturedCardProps>(() => ({
  border: 'none',
  padding: '0',
  textAlign: 'left',
  flexBasis: '100%',
  img: {
    width: '100%',
  },
}));

const FeatureCardGrid = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-between;
`;

const FeatureCardHeader = styled(Text)`
  color: ${({ theme }) => theme.ui.featuredCard.title.color};
  margin: 0;
  font-size: 18;
  font-weight: normal;
  padding: ${spacing.default} ${spacing.default} 0;
`;

const FeatureCardContent = styled(WebView)(({ theme }) => ({
  color: theme.ui.featuredCard.content.color,
  padding: `0 ${spacing.default} ${spacing.default}`,
  fontSize: 14,
  display: 'flex',
  flex: 1,
  height: 400,
}));

/**
 * Supported in all our browsers despite -webkit only prefix.
 * cuts the text after the second line and replaces it with ellipsis
 */
const FeatureCardCompact = styled(CardButtonBase)`
  border: none;
  padding: 0;
  text-align: left;
  margin-bottom: 0 !important;
  box-shadow: none;
  ${FeatureCardContent} {
    & > p,
    & > div,
    & > ul {
      margin-top: 4px;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: 'ellipsis';
    }
  }
`;

export { FeatureCard, FeatureCardCompact, FeatureCardGrid, FeatureCardContent, FeatureCardHeader };
