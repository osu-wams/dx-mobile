import * as React from 'react';
import { fal, IconDefinition, IconName, IconPrefix } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { View, Image, ImageStyle, ViewStyle } from 'react-native';
import { IconProps, CounterProps } from './icon.props';
import { icons } from './icons';
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { merge } from 'ramda';
import styled from 'styled-components/native';
import { Text } from '../text/text';
import { fontSize } from '@osu-wams/theme';

library.add(fal, fab);

const IconCounter = styled.View<CounterProps>(
  ({ theme }) => ({
    backgroundColor: theme.ui.icon.counter.background,
    borderRadius: 11,
    height: 18,
    paddingBottom: 0,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 0,
    position: 'absolute',
  }),
  ({ top }) =>
    !top
      ? {
          bottom: -8,
          right: -8,
        }
      : {
          left: -8,
          top: -8,
        },
);

const IconCounterText = styled(Text)(({ theme }) => ({
  alignSelf: 'center',
  color: theme.ui.icon.counter.color,
  fontSize: fontSize['12'],
}));

const ContainerRootStyle: ViewStyle = {
  marginRight: 10,
};

type IconStyle = ImageStyle | FontAwesomeIconStyle;

const IconRootStyle: ImageStyle = {
  height: 24,
  resizeMode: 'contain',
  width: 24,
};

export const StyledIcon = styled(FontAwesomeIcon)<IconProps>(
  ({ theme, color, bg, fontSize = 32 }) => ({
    backgroundColor: bg || theme.ui.icon.background,
    color: color || theme.ui.icon.color,
    flex: 1,
    fontSize,
    height: 32,
    width: 32,
  }),
  ({ bg }) =>
    bg && {
      borderRadius: '50%',
      padding: 8,
    },
);

const renderIcon = (props: {
  icon: any;
  iconName: string;
  color: string;
  style: IconStyle;
  size: number;
}) => {
  const { iconName, icon, size, color, ...others } = props;
  if (icon) return <StyledIcon icon={icon} size={size ?? 24} color={color} />;
  if (!iconName) return <StyledIcon icon={fal.faCube} size={size ?? 24} color={color} />;

  const iconSplit = iconName.split('.');
  if (iconSplit.length === 1) {
    return (
      <Image
        source={icons[iconName]}
        accessibilityLabel={iconName}
        style={props.style as ImageStyle}
      />
    );
  }
  switch (iconSplit[0].toLowerCase()) {
    case 'osu':
      return (
        <Image
          source={icons[iconSplit[1]]}
          accessibilityLabel={iconSplit[1]}
          style={props.style as ImageStyle}
        />
      );
    case 'fal':
    case 'fab': {
      const lookupIconDefinition: IconDefinition = findIconDefinition({
        prefix: iconSplit[0] as IconPrefix,
        iconName: iconSplit[1] as IconName,
      });
      return <StyledIcon icon={lookupIconDefinition} size={size ?? 24} {...others} />;
    }

    default:
      return <StyledIcon icon={fal.faCube} size={size ?? 24} {...others} />;
  }
};

export function Icon(props: IconProps & CounterProps) {
  const { style, iconName, containerStyle, color, icon, size, top, count } = props;
  return (
    <View style={merge(ContainerRootStyle, containerStyle)}>
      {renderIcon({ icon, iconName, color, style: merge(IconRootStyle, style), size })}
      {count !== undefined && (
        <IconCounter top={top}>
          <IconCounterText>{count}</IconCounterText>
        </IconCounter>
      )}
    </View>
  );
}
