import * as React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { RecoilRoot, RecoilState } from 'recoil';

const ROOT: ViewStyle = { backgroundColor: '#eee' };
const TITLE: TextStyle = { fontWeight: '600', color: '#3d3d3d' };
const TITLE_WRAPPER: ViewStyle = {};
const USE_CASE_WRAPPER: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  borderTopColor: '#e6e6e6',
  borderTopWidth: 1,
  flexDirection: 'row',
};
const USE_CASE: TextStyle = {
  fontSize: 10,
  color: '#666',
  paddingHorizontal: 4,
  paddingBottom: 2,
};
const USAGE: TextStyle = { color: '#666', fontSize: 10, paddingTop: 0 };
const HEADER: ViewStyle = {
  paddingTop: 20,
  paddingBottom: 10,
  paddingHorizontal: 10,
  borderBottomColor: '#e6e6e6',
  borderBottomWidth: 1,
};
const COMPONENT: ViewStyle = { backgroundColor: '#fff' };

export interface UseCaseProps {
  /** The title. */
  text: string;
  /** When should we be using this? */
  usage?: string;
  /** The component use case. */
  children: React.ReactNode;
  /** A style override. Rarely used. */
  style?: ViewStyle;
  /** Don't use any padding because it's important to see the spacing. */
  noPad?: boolean;
  /** Don't use background color because it's important to see the color. */
  noBackground?: boolean;
  initialState?: { atom: RecoilState<any>; state: any }[];
}

const RenderView = (props: UseCaseProps, style: ViewStyle) => (
  <View style={ROOT}>
    <View style={HEADER}>
      <View style={USE_CASE_WRAPPER}>
        <Text style={USE_CASE}>Use Case</Text>
      </View>
      <View style={TITLE_WRAPPER}>
        <Text style={TITLE}>{props.text}</Text>
      </View>
      {props.usage ? <Text style={USAGE}>{props.usage}</Text> : null}
    </View>
    <View style={style}>{props.children}</View>
  </View>
);

export const UseCase = (props: UseCaseProps) => {
  const style: ViewStyle = {
    ...COMPONENT,
    ...{ padding: props.noPad ? 0 : 10 },
    ...{ backgroundColor: props.noBackground ? 'rgba(0,0,0,0)' : COMPONENT.backgroundColor },
    ...props.style,
  };

  const { usage, text, children } = props;

  // Storybook Jest tests require RecoilRoot parent, while Storybook for development does not work
  // with an added RecoilRoot (see decorators.tsx)
  return __DEV__ ? (
    <RecoilRoot
      initializeState={({ set }) => {
        (props.initialState ?? []).forEach(({ atom, state }) => set(atom, state));
      }}
    >
      <RenderView style={style} usage={usage} text={text}>
        {children}
      </RenderView>
    </RecoilRoot>
  ) : (
    <RenderView style={style} usage={usage} text={text}>
      {children}
    </RenderView>
  );
};
