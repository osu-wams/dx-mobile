import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';

export const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <ProfileMenu />
    </HeaderNavWrapper>
  );
};
const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ToggleMenu onPress={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faUserCircle} size={24} />
      </ToggleMenu>
      <Menu expanded={open}>
        <MenuItem>
          <MenuItemText>Profile</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemText>Logout</MenuItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

interface IExpanded {
  expanded: boolean;
}

const ToggleMenu = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Menu = styled.View<IExpanded>`
  display: ${(props) => (props.expanded ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 5px;
  top: 38px;
  border-radius: 10px;
  background: ${({ theme }) => theme.header.headerNavList.background};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin: 0 0 20px 0;
  width: 140px;
  height: ${(props) => (props.expanded ? 'auto' : 0)};
  z-index: 100;
`;

const MenuItem = styled.TouchableOpacity`
  color: ${({ theme }) => theme.header.mainNavList.color};
  padding: 5px;
`;

const MenuItemText = styled.Text`
  color: ${({ theme }) => theme.header.mainNavList.color};
  padding: 4px 10px;
`;

const HeaderNavWrapper = styled.View`
  width: auto;
`;
