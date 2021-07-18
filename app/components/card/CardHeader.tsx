import React, { useContext, FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { Icon } from '../icon/icon';
import { spacing } from '@osu-wams/theme';
import styled from 'styled-components/native';
import { CardContext } from './Card';
import { Text } from '../text/text';
import { CardCollapseProps } from './card.props';

const CardHeaderWrapper = styled.View<CardCollapseProps>(({ theme, collapsed, collapsible }) => ({
  alignItems: 'center',
  border: 'none',
  borderBottomColor: theme.ui.card.header.borderBottom,
  borderBottomWidth: collapsed && collapsible ? 0 : 1,
  display: 'flex',
  height: 64,
  flexDirection: 'row',
  fontSize: 16,
  fontWeight: 'normal',
  padding: spacing.default,
  width: '100%',
}));

export const CardHeaderSimple = styled.View({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontSize: 16,
  height: 64,
  padding: spacing.default,
});

const HeaderTitle = styled(Text)({
  flex: 1,
  fontSize: 16,
});

const CardHeader: FC<{ title?: string; badge?: any }> = ({ title, badge, ...props }) => {
  const { collapsed, toggleCollapsed, collapsible } = useContext(CardContext);
  return (
    <TouchableOpacity onPress={collapsible ? toggleCollapsed : undefined} disabled={!collapsible}>
      <CardHeaderWrapper collapsible={collapsible} collapsed={collapsed} {...props}>
        {badge && badge}
        {title && <HeaderTitle>{title}</HeaderTitle>}
        {props.children && props.children}
        {collapsible && <Icon icon={collapsed ? faChevronDown : faChevronUp} />}
      </CardHeaderWrapper>
    </TouchableOpacity>
  );
};

export default CardHeader;
