import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../icon/Icon';

const IconButton = ({
  iconName,
  iconSize = 20,
  onPress,
  color = '#000',
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon name={iconName} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
