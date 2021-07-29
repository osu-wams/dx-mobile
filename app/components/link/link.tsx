/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { faLongArrowRight, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Icon } from '../icon/icon';
import { borderRadius, spacing, fontSize, Color } from '@osu-wams/theme';
import { LinkProps, LinkStyleProps } from './link.props';
import { Alert, Pressable, View } from 'react-native';
import { Text } from '../text/text';
import * as Linking from 'expo-linking';
import { NavigationContext } from '@react-navigation/native';

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

const LinkStyles = styled(Pressable)<LinkStyleProps>(
  ({ noFlex = false, flexDirection = 'row' }) => ({
    alignItems: 'center',
    flex: noFlex ? undefined : 1,
    flexBasis: noFlex ? undefined : 1,
    flexGrow: noFlex ? undefined : 1,
    flexDirection,
  }),
);

const HighlightExternalLinkStyles = styled(LinkStyles)<LinkStyleProps>(() => ({
  fontSize: fontSize[24],
  fontWeight: 600,
  padding: 0,
}));

const ExternalLink = (props: LinkProps) => {
  const themeContext = useContext(ThemeContext);
  const { fg, hideIcon, text, padding, bg, url } = props;
  return (
    <LinkStyles {...props} onPress={() => (url ? Linking.openURL(url) : null)}>
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
  const { text, padding, bg, fg, hideIcon, url, ...rest } = props;
  return (
    <HighlightExternalLinkStyles {...rest} onPress={() => (url ? Linking.openURL(url) : null)}>
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
  const { text, fg, padding, bg, url, textStyle, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={0} onPress={() => (url ? Linking.openURL(url) : null)}>
      <LinkText style={textStyle} text={text} fg={fg} padding={padding} bg={bg} />
    </LinkStyles>
  );
};

const InternalLink = (props: LinkProps) => {
  const { text, to, fg, padding, bg, hideIcon, ...rest } = props;
  const themeContext = useContext(ThemeContext);
  const navigation = useContext(NavigationContext);
  return (
    <LinkStyles fg={fg} {...rest} onPress={() => (to ? navigation.navigate({ ...to }) : null)}>
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
  const navigation = useContext(NavigationContext);
  const { to, text, fg, padding, bg, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={0} onPress={() => (to ? navigation.navigate({ ...to }) : null)}>
      <LinkText text={text} fg={fg} padding={padding} bg={bg} />
    </LinkStyles>
  );
};

const SimpleModalLink = (props: LinkProps) => {
  useContext(ThemeContext);
  const { text, fg, bg, padding, ...rest } = props;
  return (
    <LinkStyles {...rest} padding={0} onPress={() => Alert.alert('here')}>
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
