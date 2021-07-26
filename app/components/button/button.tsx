import * as React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { ButtonProps } from './button.props';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';
import { faTimes, faLink } from '@fortawesome/pro-light-svg-icons';
import { borderRadius, fontSize } from '@osu-wams/theme';

const btnVariants = {
  normal: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  small: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 14,
  },
  large: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 28,
    paddingRight: 28,
    fontSize: 18,
  },
};

const ButtonText = styled(Text)<{ fg?: string }>(({ theme, fg }) => ({
  color: fg ?? theme.ui.button.color,
}));

const ButtonBase = styled(TouchableOpacity)<{ bg?: string; btnSize?: string }>(
  ({ theme, bg }) => ({
    backgroundColor: bg ?? theme.ui.button.background,
    border: 'none',
    borderRadius: borderRadius[4],
    alignItems: 'center',
  }),
  ({ btnSize = 'normal' }) => btnVariants[btnSize],
);

export const Button = (props: ButtonProps) => {
  const { children, text, fg, textStyle, ...rest } = props;
  if (text) {
    return (
      <ButtonBase {...rest}>
        <ButtonText fg={fg} style={textStyle}>
          {text}
        </ButtonText>
      </ButtonBase>
    );
  }
  return <ButtonBase {...rest}>{children}</ButtonBase>;
};

const CloseButtonBase = styled(Button)(({ theme }) => ({
  background: theme.ui.button.close.background,
  color: theme.ui.button.close.color,
  fontSize: fontSize['24'],
  paddingBottom: 16,
  paddingLeft: 32,
  paddingRight: 32,
  paddingTop: 16,
}));

export const CloseButton = (props) => (
  <CloseButtonBase {...props}>
    <Icon icon={faTimes} />
  </CloseButtonBase>
);

const ButtonLinkIcon = styled(Icon)<ButtonProps>(({ theme, fg }) => ({
  color: fg || theme.ui.button.color,
  marginLeft: 5,
}));

const ButtonLinkBase = styled(ButtonBase)<ButtonProps>({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
});

export const ButtonLink = (props) => {
  const { text, fg, textStyle, ...rest } = props;
  return (
    <ButtonLinkBase {...rest}>
      <ButtonText fg={fg} style={textStyle}>
        {text}
      </ButtonText>
      <ButtonLinkIcon icon={faLink} />
    </ButtonLinkBase>
  );
};
