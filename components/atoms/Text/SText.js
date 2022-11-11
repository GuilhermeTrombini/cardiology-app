import React from 'react';
import {Text} from 'react-native';
import {getStyles} from './styles';

export default function SText({children, ...props}) {
  const {defaultText} = getStyles();
  return (
    <Text style={defaultText} {...props}>
      {children}
    </Text>
  );
}
