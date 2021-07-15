import React, { useContext } from 'react';
import styled from 'styled-components/native';
import InfoButton from '../info-button/InfoButton';
import { spacing } from '@osu-wams/theme';
import { CardContext } from './Card';
import { CardCollapseProps } from './card.props';

const CardFooter = ({ ...props }) => {
  const { collapsed, collapsible } = useContext(CardContext);

  return props.children || props.infoButtonId ? (
    <CardFooterWrapper collapsed={collapsed} collapsible={collapsible} {...props}>
      <InfoButton infoButtonId={props.infoButtonId} />
      {props.children}
    </CardFooterWrapper>
  ) : (
    <></>
  );
};

const CardFooterWrapper = styled.View<CardCollapseProps>(
  {
    padding: spacing.default,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    /* If we only have 1 link, align it right
    'a:only-child': {
      marginLeft: 'auto',
    }, */
  },
  ({ collapsible, collapsed }) =>
    collapsible && {
      flex: 1,
      height: collapsed ? 0 : 'auto',
      padding: collapsed ? 0 : `${spacing.medium} ${spacing.default}`,
      display: collapsed ? 'none' : 'flex',
    },
);

export default CardFooter;
