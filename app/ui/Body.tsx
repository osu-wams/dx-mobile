import styled from 'styled-components/native';

const Body = styled.ScrollView`
  border-top-color: ${({ theme }) => theme.header.headerNavList.border.color};
  background-color: ${({ theme }) => theme.body.background};

  border-top-width: 1px;
  padding: 20px 10px 20px;
`;

export { Body };
