import React from 'react';
import styled from 'styled-components/native';
import { LogoWhite } from '../components/logos/logo-white';
import { HeaderNav } from './HeaderNav';

export const Header = () => {
  return (
    <LogoNavWrapper>
      <LogoSize>
        <LogoWhite />
      </LogoSize>
      <HeaderNav />
    </LogoNavWrapper>
  );
};

const LogoSize = styled.View`
  width: 188px;
  height: 60px;
`;

const LogoNavWrapper = styled.View`
  background-color: ${({ theme }) => theme.header.background};
  height: 85px;
  padding: 2px 10px 0 10px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
`;
