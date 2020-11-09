import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';

export const DropdownLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" />
    </View>
  );
};
