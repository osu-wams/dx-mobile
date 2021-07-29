import styled from 'styled-components/native';
import { borderRadius, spacing } from '@osu-wams/theme';
import { CardBadgeProps, CardContentRowProps } from './card.props';

const CardBase = styled.View(({ theme }) => ({
  backgroundColor: theme.ui.card.background,
  borderRadius: borderRadius[16],
  elevation: '3',
  flex: 1,
  flexDirection: 'column',
  marginBottom: spacing.mobile,
  shadowColor: 'rgba(66, 62, 60, 1)',
  shadowOpacity: '0.2',
  shadowRadius: 8,
}));

// Duplicates CardBase with motion to add animations
// TODO: framer-motion removed here, for react-native how do we have tap effects or similar? See ticket MMA-9
const CardButtonBase = styled(CardBase)(({ theme }) => ({
  backgroundColor: theme.ui.card.background,
  borderRadius: borderRadius[16],
  flex: 1,
  flexDirection: 'column',
  marginBottom: spacing.mobile,
  overflow: 'hidden',
}));

// TODO: Need to create this as a component which is a View wrapping a Text and the text is what has "color"
const Badge = styled.View<CardBadgeProps>(({ theme, bg, fg }) => ({
  alignItems: 'center',
  backgroundColor: bg || theme.ui.card.badge.background,
  borderRadius: borderRadius[16],
  color: fg || theme.ui.card.badge.color,
  flex: 1,
  height: 32,
  justifyContent: 'center',
  marginRight: 12,
  width: 32,
}));

/**
 * UI component intended to become full-width with a single flex column to fill
 * a card in place of a CardContent component.
 */
const CardContentTable = styled.View({
  flex: 1,
  flexDirection: 'column',
});

/**
 * A row with an optional bottom border to establish a full width series of nested cells, intended to be
 * used inside of a CardContentTable UI.
 */
const CardContentRow = styled.View<CardContentRowProps>(({ theme, borderless }) => ({
  backgroundColor: theme.ui.card.contentRow.background,
  borderBottom: borderless ? 'none' : `1px solid ${theme.ui.card.contentRow.borderBottom}`,
  flex: 1,
  flexDirection: 'row',
  overflow: 'hidden',
}));

/**
 * A cell intended to be used inside of a CardContentRow UI.
 */
// TODO: & + div { border-left: 1px solid theme.ui.card.contentCell.borderLeft }
// TODO: Add a left border to a nested view
const CardContentCell = styled.View(({ theme }) => ({
  flexBasis: 0,
  flexGrow: 1,
  padding: spacing.default,
  /*
  & + div {
    border-left: 1px solid ${({ theme }) => theme.ui.card.contentCell.borderLeft};
    */
}));

export { CardBase, CardButtonBase, Badge, CardContentCell, CardContentRow, CardContentTable };
