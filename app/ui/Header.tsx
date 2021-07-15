import React from 'react';
import styled from 'styled-components/native';
import { LogoWhite } from '../components/logos/logo-white';
import { fontSize } from '@osu-wams/theme';
import { HeaderNav } from './HeaderNav';

interface IHeader {
  pageTitle: string;
}
const Header = ({ pageTitle }: IHeader) => {
  return (
    <TopWrapper>
      <LogoNavWrapper>
        <LogoSize>
          <LogoWhite />
        </LogoSize>
        <HeaderNav />
      </LogoNavWrapper>
      <PageTitle>{pageTitle}</PageTitle>
    </TopWrapper>
  );
};

const LogoSize = styled.View`
  width: 188px;
  height: 60px;
`;
const TopWrapper = styled.View`
  flex-direction: column;
  margin-bottom: 10px;
  z-index: 99;
`;

const PageTitle = styled.Text`
  color: rgb(105, 99, 97);
  font-size: ${fontSize[24]};
  padding: 10px 0 12px 0;
`;

export { Header };

const LogoNavWrapper = styled.View`
  background-color: ${({ theme }) => theme.header.background};
  height: 85px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-flow: row wrap;
`;
