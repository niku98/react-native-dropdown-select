import * as React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import DropdownSelect from '@niku/react-native-dropdown-select';
import { defaultValue, options } from './constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <SafeAreaProvider>
      <StatusBar translucent />
      <View style={styles.container}>
        <DropdownSelect
          options={options}
          value={value}
          onSelectOption={(option) => {
            setValue(option.value);
          }}
          onHideDropdown={() => {
            console.log('hide');
          }}
          onShowDropdown={() => {
            console.log('show');
          }}
          buttonWrapperStyle={{ width: '100%' }}
        />
        <Text style={{ marginVertical: 20 }}>Selected value: {value}</Text>
        <Button title="Default" onPress={() => setValue(defaultValue)} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
});
