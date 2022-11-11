import React from 'react';
import {TouchableOpacity} from 'react-native';
import SText from '../Text/SText';
import {getStyles} from './styles';

export default function ButtonIcon({
  iconName,
  iconSize,
  iconColor,
  label,
  isDisabled = false,
  onPress = () => {},
  borderColor,
  backgroundColor,
  fontColor,
  fontSize,
  fontWeight,
  ...props
}) {
  const {textStyle, touchableContainer} = getStyles({
    isDisabled,
    backgroundColor,
    fontColor,
    fontSize,
    fontWeight,
    borderColor,
  });

  const onPressButton = () => (isDisabled ? null : onPress());
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressButton}
      style={touchableContainer}
      {...props}>
      <SText style={textStyle}>{label}</SText>
    </TouchableOpacity>
  );
}
