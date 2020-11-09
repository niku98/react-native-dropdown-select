import React, { useMemo } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Images } from '../assets';
import type { DropdownButtonProps } from '../types';
import { styles } from './styles';

export const DropdownButton = ({
  selectedOption,
  show,
  position,
  placeholder,
  style,
  labelStyle,
  iconStyle,
  placeholderStyle,
  loading,
}: DropdownButtonProps) => {
  const iconSource = useMemo(() => {
    if (position === 'top') {
      return show ? Images.chevronDown : Images.chevronUp;
    }
    return show ? Images.chevronUp : Images.chevronDown;
  }, [show, position]);

  return (
    <View style={[styles.container, style]}>
      {selectedOption ? (
        <Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {selectedOption.label}
        </Text>
      ) : (
        <Text style={[styles.placeholder, placeholderStyle]} numberOfLines={1}>
          {placeholder}
        </Text>
      )}
      {loading ? (
        <ActivityIndicator color="black" size="small" />
      ) : (
        <Image source={iconSource} style={[styles.icon, iconStyle]} />
      )}
    </View>
  );
};
