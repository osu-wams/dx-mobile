import * as React from 'react';
import { KeyboardAvoidingViewProps, Platform, ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';
import { ScreenProps } from './screen.props';
interface InsetInterface {
  scroll?: boolean;
}

const KeyboardAvoidingViewWrapper = styled.KeyboardAvoidingView<KeyboardAvoidingViewProps>(
  ({ theme }) => ({
    backgroundColor: theme.body.background,
    flex: 1,
    height: '100%',
  }),
);

const ScrollViewWrapper = styled.ScrollView<ScrollViewProps>(({ theme }) => ({
  backgroundColor: theme.body.background,
  flex: 1,
  height: '100%',
}));

const ViewWrapper = styled.View<InsetInterface>(
  ({ theme }) => ({
    backgroundColor: theme.header.background,
    height: '100%',
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
  return (
    <KeyboardAvoidingViewWrapper
      behavior={isIos ? 'padding' : null}
      // keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <ViewWrapper>{props.children}</ViewWrapper>
    </KeyboardAvoidingViewWrapper>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  return (
    <KeyboardAvoidingViewWrapper
      behavior={isIos ? 'padding' : null}
      // keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <ViewWrapper scroll>
        <ScrollViewWrapper
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
          bounces={false}
        >
          {props.children}
        </ScrollViewWrapper>
      </ViewWrapper>
    </KeyboardAvoidingViewWrapper>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if ((props.preset ?? 'scroll') === 'scroll') {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
