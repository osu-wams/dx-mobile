import React, { FC, useContext } from 'react';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import styled, { ThemeContext } from 'styled-components/native';
import { Icon } from '../icon/icon';

const CardIconWrapper = styled.View({
  marginRight: 12,
});

const CardIconBase = styled(Icon)({
  fontSize: 24,
});

const CardIcon: FC<{ icon: IconDefinition; count?: number }> = ({ icon, count }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <CardIconWrapper>
      <CardIconBase icon={icon} color={themeContext.ui.card.icon.color} count={count} />
    </CardIconWrapper>
  );
};

export default CardIcon;
