import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { spacing } from '@osu-wams/theme';

export const ResourceList = styled(FlatList)({
  paddingTop: spacing.default,
});
