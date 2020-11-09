import * as React from 'react';
import { Text, View } from 'react-native';
import type { DropdownOptionProps } from '../types';
import { styles } from './styles';

const OptionItem = ({
  option,
  style,
  labelStyle,
  activeStyle,
  activeLableStyle,
  active,
}: DropdownOptionProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
        active && styles.activeContainer,
        active && activeStyle,
      ]}
    >
      <Text
        style={[
          styles.label,
          labelStyle,
          active && styles.activeLabel,
          active && activeLableStyle,
        ]}
        numberOfLines={1}
      >
        {option.label}
      </Text>
    </View>
  );
};

export default OptionItem;
