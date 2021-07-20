import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { spacing } from '@osu-wams/theme';
import { CardContext } from './Card';
import { CardCollapseProps } from './card.props';

const CardContent = ({ ...props }) => {
  const { collapsed, collapsible } = useContext(CardContext);
  return <CardContentWrapper collapsed={collapsed} collapsible={collapsible} {...props} />;
};

const CardContentWrapper = styled.View<CardCollapseProps>(
  ({ flush }) => ({
    overflow: 'hidden',
    padding: flush ? 0 : `${spacing.default} ${spacing.default} 0 ${spacing.default}`,
  }),
  ({ collapsed, collapsible }) =>
    collapsible && {
      flex: collapsed ? 1 : 1,
      height: collapsed ? 0 : 'auto',
      padding: collapsed ? 0 : spacing.default,
    },
);

export default CardContent;
