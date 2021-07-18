/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { faLongArrowRight, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Icon } from '../icon/icon';
import { borderRadius, spacing, fontSize, Color } from '@osu-wams/theme';
import { LinkProps, LinkStyleProps } from './link.props';
import { View } from 'react-native';
import { Text } from '../text/text';

export const LinkDivider = () => (
  <View>
    <Text style={{ color: Color['neutral-300'] }}>|</Text>
  </View>
);

const LinkText = styled(Text)<LinkStyleProps>(
  ({ theme, fg, padding }) => ({
    backgroundColor: theme.ui.link.background,
    color: fg ?? theme.ui.link.color,
    padding: padding ?? `${spacing.small} ${spacing.medium}`,
  }),
  ({ bg }) =>
    bg && {
      backgroundColor: bg,
      borderRadius: borderRadius[8],
      fontWeight: 500,
    },
);

const LinkStyles = styled(View)<LinkStyleProps>({
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
});

const HighlightExternalLinkStyles = styled(LinkStyles)<LinkStyleProps>(() => ({
  fontSize: fontSize[24],
  fontWeight: 600,
  padding: 0,
}));

const ExternalLink = (props: LinkProps) => {
  const themeContext = useContext(ThemeContext);
  const { fg, hideIcon, text, padding, bg } = props;
  return (
    <LinkStyles {...props}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
      {!hideIcon && (
        <Icon
          containerStyle={{ marginLeft: 4 }}
          icon={faLongArrowRight}
          color={fg ?? themeContext.ui.link.icon.external.color}
        />
      )}
    </LinkStyles>
  );
};

const HighlightExternalLink = (props: LinkProps) => {
  const themeContext = useContext(ThemeContext);
  const { text, padding, bg, fg, hideIcon, ...rest } = props;
  return (
    <HighlightExternalLinkStyles {...rest}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
      {!hideIcon && (
        <Icon
          containerStyle={{ marginLeft: 4 }}
          icon={faExternalLink}
          color={fg ?? themeContext.ui.link.icon.external.color}
        />
      )}
    </HighlightExternalLinkStyles>
  );
};

const SimpleExternalLink = (props: LinkProps) => {
  const { text, fg, padding, bg, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={0}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
    </LinkStyles>
  );
};

const InternalLink = (props: LinkProps) => {
  const { text, to, fg, padding, bg, hideIcon, ...rest } = props;
  const themeContext = useContext(ThemeContext);
  return (
    <LinkStyles to={to} fg={fg} {...rest}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
      {!hideIcon && (
        <Icon
          containerStyle={{ marginLeft: 4 }}
          icon={faLongArrowRight}
          color={fg ?? themeContext.ui.link.icon.internal.color}
        />
      )}
    </LinkStyles>
  );
};

const SimpleInternalLink = (props: LinkProps) => {
  useContext(ThemeContext);
  const { to, text, fg, padding, bg, ...rest } = props;
  return (
    <LinkStyles {...rest} to={to} padding={0}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
    </LinkStyles>
  );
};

const SimpleModalLink = (props: LinkProps) => {
  useContext(ThemeContext);
  const { text, fg, bg, padding, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={0}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
    </LinkStyles>
  );
};

export {
  ExternalLink,
  InternalLink,
  SimpleExternalLink,
  SimpleInternalLink,
  SimpleModalLink,
  HighlightExternalLink,
};
