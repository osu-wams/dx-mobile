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

library.add(fal, fab);

const IconCounter = styled.View<CounterProps>(
  ({ theme }) => ({
    position: 'absolute',
    backgroundColor: theme.ui.icon.counter.background,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 11,
    height: 18,
  }),
  ({ top }) =>
    !top
      ? {
          bottom: -8,
          right: -8,
        }
      : {
          top: -8,
          left: -8,
        },
);

const IconCounterText = styled(Text)(({ theme }) => ({
  alignSelf: 'center',
  color: theme.ui.icon.counter.color,
  fontSize: 12,
}));

const ContainerRootStyle: ViewStyle = {
  marginRight: 10,
};

type IconStyle = ImageStyle | FontAwesomeIconStyle;

const IconRootStyle: ImageStyle = {
  height: 16,
  resizeMode: 'contain',
  width: 16,
};

export const StyledIcon = styled(FontAwesomeIcon)<IconProps>(
  ({ theme, color, bg }) => ({
    color: color || theme.ui.icon.color,
    backgroundColor: bg || theme.ui.icon.background,
  }),
  ({ bg }) =>
    bg && {
      padding: 8,
      borderRadius: '50%',
    },
  ({ fontSize }) =>
    fontSize && {
      fontSize: fontSize,
    },
);

const renderIcon = (props: {
  icon: any;
  iconName: string;
  color: string;
  style: IconStyle;
  size: number;
}) => {
  const { iconName, icon, ...others } = props;
  if (icon) return <StyledIcon icon={icon} {...others} />;
  if (!iconName) return <StyledIcon icon={fal.faCube} {...others} />;

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
      return <StyledIcon icon={lookupIconDefinition} {...others} />;
    }

    default:
      return <StyledIcon icon={fal.faCube} {...others} />;
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
