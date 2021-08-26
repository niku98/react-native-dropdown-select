import * as React from 'react';
import { Text, View } from 'react-native';
import type { DropdownOptionProps } from '../types';
import { styles } from './styles';

const OptionItem = ({
  option,
  style,
  labelStyle,
  activeStyle,
  activeLabelStyle,
  active,
  disabledStyle,
  disabledLabelStyle,
}: DropdownOptionProps) => {
  return (
    <View
      style={[
        styles.container,
        style,
        active && styles.activeContainer,
        active && activeStyle,
        option.disabled && disabledStyle,
      ]}
    >
      <Text
        style={[
          styles.label,
          labelStyle,
          active && styles.activeLabel,
          active && activeLabelStyle,
          option.disabled && styles.disabledLabel,
          option.disabled && disabledLabelStyle,
        ]}
        numberOfLines={1}
      >
        {option.label}
      </Text>
    </View>
  );
};

export default React.memo(OptionItem);
