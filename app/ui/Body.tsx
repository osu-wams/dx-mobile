import * as React from 'react';
import styled from 'styled-components/native';

const BodyBase = styled.FlatList(({ theme }) => ({
  borderTopColor: theme.header.headerNavList.border.color,
  borderTopWidth: 1,
  backgroundColor: theme.body.background,
  paddingBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
}));

const Body = ({ children }) => (
  <BodyBase
    data={[children]}
    renderItem={({ item }) => <>{item}</>}
    keyExtractor={(index) => `body-child${index}`}
  />
);

export { Body };
