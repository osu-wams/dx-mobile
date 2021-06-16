import * as React from 'react';
import { fal, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { View, Image, ImageStyle } from 'react-native';
import { IconProps } from './icon.props';
import { icons } from './icons';
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconStyle } from '@fortawesome/react-native-fontawesome';
import { merge } from 'ramda';

library.add(fal, fab);

const ROOT: ImageStyle = {
  height: 26,
  resizeMode: 'contain',
  width: 26,
};

const IconLookup = (icon, iconName, color, style, size = 26) => {
  if (icon) {
    return <FontAwesomeIcon icon={icon} color={color} size={size} style={style} />;
  }
  if (iconName) {
    const iconSplit = iconName.split('.');
    if (iconSplit.length === 1) {
      return <Image source={icons[iconName]} accessibilityLabel={iconName} style={style} />;
    }
    if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
      const lookupIconDefinition: IconDefinition = findIconDefinition({
        prefix: iconSplit[0],
        iconName: iconSplit[1],
      });
      return (
        <FontAwesomeIcon icon={lookupIconDefinition} color={color} size={size} style={style} />
      );
    } else if (iconSplit[0] === 'osu') {
      return <Image source={icons[iconSplit[1]]} accessibilityLabel={iconSplit[1]} style={style} />;
    } else {
      return <FontAwesomeIcon icon={fal.faCube} color={color} size={size} style={style} />;
    }
  }
  return <FontAwesomeIcon icon={fal.faCube} color={color} size={size} style={style} />;
};

export function Icon(props: IconProps) {
  const { style: styleOverride, iconName, containerStyle, color, icon, size } = props;
  const style: ImageStyle | FontAwesomeIconStyle = merge(ROOT, styleOverride);

  return <View style={containerStyle}>{IconLookup(icon, iconName, color, style, size)}</View>;
}
