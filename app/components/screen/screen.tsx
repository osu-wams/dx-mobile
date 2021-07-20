import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenProps } from './screen.props';
import { isNonScrolling, offsets, presets } from './screen.presets';
import { HEADER_NAV_HEIGHT } from '../../ui/Header';
interface InsetInterface {
  inset: number;
  scroll?: boolean;
}

const ViewWrapper = styled.View<InsetInterface>(
  ({ inset, theme }) => ({
    backgroundColor: theme.header.background,
    height: '100%',
    paddingTop: inset,
  }),
  ({ scroll }) =>
    scroll
      ? {
          // scroll view styles
          flex: 1,
        }
      : {
          // no scroll view styles
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          width: '100%',
        },
);

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const insetStyle = props.unsafe ? 0 : insets.top + HEADER_NAV_HEIGHT;

  return (
    <KeyboardAvoidingView
      style={preset.outer}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <ViewWrapper inset={insetStyle}>{props.children}</ViewWrapper>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const insetStyle = props.unsafe ? 0 : insets.top + HEADER_NAV_HEIGHT;

  return (
    <KeyboardAvoidingView
      style={preset.outer}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <ViewWrapper inset={insetStyle} scroll>
        <ScrollView style={preset.outer} contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </ViewWrapper>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
