import React from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { LogoWhite } from '../components/logos/logo-white';
import { HeaderNav } from './HeaderNav';

export const HEADER_NAV_HEIGHT = 85;

export const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <LogoNavWrapper insets={insets}>
      <LogoSize>
        <LogoWhite />
      </LogoSize>
      <HeaderNav />
    </LogoNavWrapper>
  );
};

const LogoSize = styled.View({
  height: 60,
  width: 188,
});

const LogoNavWrapper = styled.View<{ insets: EdgeInsets }>(({ theme, insets }) => ({
  backgroundColor: theme.header.background,
  display: 'flex',
  flexDirection: 'row',
  flexFlow: 'row wrap',
  height: HEADER_NAV_HEIGHT,
  justifyContent: 'space-between',
  marginTop: insets.top,
  paddingBottom: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 2,
  zIndex: 10,
}));
