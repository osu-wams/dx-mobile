import * as React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { CheckboxProps } from './checkbox.props';

const CheckBoxContainer = styled(Pressable)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

export function Checkbox(props: CheckboxProps) {
  const { onToggle, checked, checkedIcon, icon, value, style } = props;
  const onPress = onToggle ? () => onToggle && onToggle(!value) : null;

  return (
    <CheckBoxContainer style={style} activeOpacity={1} disabled={!onToggle} onPress={onPress}>
      {checked ? checkedIcon : icon}
    </CheckBoxContainer>
  );
}
