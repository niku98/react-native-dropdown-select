import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DropdownSelect from 'react-native-dropdown-select';
import { defaultValue, options } from './constants';

export default function App() {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <>
      <View style={styles.container}>
        <View>
          <DropdownSelect
            options={options}
            defaultValue={defaultValue}
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
            withStatusBar={true}
          />
        </View>
        <Text>{value}</Text>
        <Button title="Default" onPress={() => setValue(defaultValue)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
