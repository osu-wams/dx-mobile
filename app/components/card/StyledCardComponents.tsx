import styled from 'styled-components/native';
import { borderRadius, spacing } from '@osu-wams/theme';
import { CardBadgeProps, CardContentRowProps } from './card.props';

const CardBase = styled.View(({ theme }) => ({
  backgroundColor: theme.ui.card.background,
  borderRadius: borderRadius[16],
  display: 'flex',
  elevation: '3',
  flexDirection: 'column',
  marginBottom: spacing.mobile,
  shadowColor: 'rgba(66, 62, 60, 1)',
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: '0.15',
  shadowRadius: '8px',
}));

// Duplicates CardBase with motion to add animations
// TODO: framer-motion removed here, for react-native how do we have tap effects or similar? See ticket MMA-9
const CardButtonBase = styled(CardBase)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: borderRadius[16],
  overflow: 'hidden',
  marginBottom: spacing.mobile,
  backgroundColor: theme.ui.card.background,
}));

// TODO: Need to create this as a component which is a View wrapping a Text and the text is what has "color"
const Badge = styled.View<CardBadgeProps>(({ theme, bg, fg }) => ({
  height: 32,
  width: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 16,
  backgroundColor: bg || theme.ui.card.badge.background,
  color: fg || theme.ui.card.badge.color,
  marginRight: 12,
}));

/**
 * UI component intended to become full-width with a single flex column to fill
 * a card in place of a CardContent component.
 */
const CardContentTable = styled.View({
  display: 'flex',
  flexDirection: 'column',
});

/**
 * A row with an optional bottom border to establish a full width series of nested cells, intended to be
 * used inside of a CardContentTable UI.
 */
const CardContentRow = styled.View<CardContentRowProps>(({ theme, borderless }) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.ui.card.contentRow.background,
  overflow: 'hidden',
  borderBottom: borderless ? 'none' : `1px solid ${theme.ui.card.contentRow.borderBottom}`,
}));

/**
 * A cell intended to be used inside of a CardContentRow UI.
 */
// TODO: & + div { border-left: 1px solid theme.ui.card.contentCell.borderLeft }
// TODO: Add a left border to a nested view
const CardContentCell = styled.View(({ theme }) => ({
  padding: spacing.default,
  flexGrow: 1,
  flexBasis: 0,
  /*
  & + div {
    border-left: 1px solid ${({ theme }) => theme.ui.card.contentCell.borderLeft};
    */
}));

export { CardBase, CardButtonBase, Badge, CardContentCell, CardContentRow, CardContentTable };
