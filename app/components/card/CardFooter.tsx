import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components/native';
import InfoButton from '../info-button/InfoButton';
import { spacing } from '@osu-wams/theme';
import { CardContext } from './Card';
import { CardCollapseProps } from './card.props';

const CardFooterWrapper = styled.View<CardCollapseProps & { children?: ReactNode[] }>(
  {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    overflow: 'hidden',
    padding: spacing.default,
  },
  ({ children }) =>
    children &&
    children.length > 1 && {
      alignItems: 'flex-end',
    },
  ({ collapsible, collapsed }) =>
    collapsible && {
      display: collapsed ? 'none' : 'flex',
      flex: 1,
      height: collapsed ? 0 : 'auto',
      padding: collapsed ? 0 : `${spacing.medium} ${spacing.default}`,
    },
);

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

export default CardFooter;
