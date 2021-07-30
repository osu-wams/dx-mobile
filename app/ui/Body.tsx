import * as React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const BodyBase = styled(View)(({ theme }) => ({
  borderTopColor: theme.header.headerNavList.border.color,
  borderTopWidth: 1,
  backgroundColor: theme.body.background,
  flex: 1,
  paddingBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
}));

const Body = ({ children }) => <BodyBase>{children}</BodyBase>;

export { Body };
