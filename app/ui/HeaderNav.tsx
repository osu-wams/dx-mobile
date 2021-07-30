import React, { useState } from 'react';
import styled from 'styled-components/native';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Icon, Text } from '../components';

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
        <Icon noFlex icon={faUserCircle} size={24} />
      </ToggleMenu>
      <Menu expanded={open}>
        <MenuItem>
          <MenuItemText text="Profile" />
        </MenuItem>
        <MenuItem>
          <MenuItemText text="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};
interface IExpanded {
  expanded: boolean;
}

const ToggleMenu = styled.TouchableOpacity({
  position: 'absolute',
  right: 10,
  top: 10,
});

const Menu = styled.View<IExpanded>(({ theme, expanded }) => ({
  background: theme.header.headerNavList.background,
  borderRadius: 10,
  display: expanded ? 'flex' : 'none',
  elevation: '3',
  flexDirection: 'column',
  height: expanded ? 'auto' : 0,
  margin: '0 0 20px 0',
  position: 'absolute',
  right: 5,
  shadowColor: 'rgba(66, 62, 60, 1)',
  shadowOpacity: '0.2',
  shadowRadius: 8,
  top: 38,
  width: 140,
  zIndex: 1000,
}));

const MenuItem = styled.TouchableOpacity({
  padding: 5,
});

const MenuItemText = styled(Text)(({ theme }) => ({
  color: theme.header.mainNavList.color,
  padding: '4px 10px',
}));

const HeaderNavWrapper = styled.View({
  flex: 1,
});
