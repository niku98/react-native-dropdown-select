# React Native Dropdown Select

A Dropdown select component for React Native. Easy to use with only one needed configuration.

## Demo
<img src="https://github.com/niku98/react-native-dropdown-select/blob/master/screenshots/demo_1.gif?raw=true" width="170" alt="Demo 1"/>

## Table of contents
- [React Native Dropdown Select](#react-native-dropdown-select)
  - [Demo](#demo)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [With npm](#with-npm)
    - [With yarn](#with-yarn)
  - [Add SafeAreaProvider](#add-safeareaprovider)
  - [Usage](#usage)
  - [What's new](#whats-new)
  - [Props](#props)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

### With npm
```sh
npm install react-native-safe-area-context @niku/react-native-dropdown-select
```

### With yarn
```sh
yarn add react-native-safe-area-context @niku/react-native-dropdown-select
```

## Add SafeAreaProvider
You have to add `SafeAreaProvider` at your App's root (App.tsx/App.jsx).
```js
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  return (
    <SafeAreaProvider>
    {/* ... */}
  </SafeAreaProvider>
  );
}
```

## Usage

```js
// ...
import DropdownSelect from 'react-native-dropdown-select';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// ...

const options = [
  {
    label: "Select language or framework you love",
    value: null,
  },
  {
    label: "Languages",
    options: [
      {
        label: 'Javascript',
        value: 'js',
      },
      {
        label: 'Typescript',
        value: 'ts',
      },
      {
        label: 'Python',
        value: 'py',
      }
    ]
  },
  {
    label: "Frameworks - Libraies",
    options: [
      {
        label: 'Reactjs',
        value: 'reactjs',
      },
      {
        label: 'React Native',
        value: 'react-native',
      },
      {
        label: 'Vuejs',
        value: 'vuejs',
      },
      {
        label: "Laravel",
        value: "laravel"
      }
    ]
  },
  {
    label: "Others",
    value: "others"
  }
];

const defaultValue = 'js';

function App() {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <SafeAreaProvider>
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
          />
        </View>
        <Text>{value}</Text>
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
  },
});
```

## What's new
There are some new features in this verson.
- **Option group**: You can group your option. Both *option item* and *option group* can be mixed in props `options` (See in **Usage** above).
- **withStatusBar**: Deprecated. I caculate position of dropdown button with `react-native-safe-area-context`'s frame and insets. So, we don't need this props anymore.

## Props
| Name                     | Description                                                                             | Type                                             | Default                 | Required |
| ------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------- | -------- |
| options                  | List of option for dropdown                                                             | `array`                                          |                         | Yes      |
| defaultValue             | Default value to display                                                                | `any`                                            |                         | No       |
| value                    | Current value of dropdown select                                                        | `any`                                            |                         | No       |
| position                 | Position of dropdown                                                                    | `'top' | 'bottom'`                               | `'bottom'`              | No       |
| placeholder              | Placeholder of dropdown select to display when no option selected                       | `string`                                         | `'Select an option...'` | No       |
| loading                  | Loading state of dropdown select                                                        | `boolean`                                        | `false`                 | No       |
| withStatusBar            | Deprecated                                                                              | `boolean`                                        | `true`                  | No       |
| component                | Component to render dropdown button                                                     | `React.ComponentType | React.ReactNode`          |                         | No       |
| render                   | Render dropdown button via render function                                              | `(props) => React.ReactNode`                     |                         | No       |
| children                 | Loading state of dropdown select                                                        | `(props) => React.ReactElemnt | React.ReactNode` |                         | No       |
| loadingComponent         | Loading component to render loading icon                                                | `React.ComponentType | React.ReactNode`          |                         | No       |
| renderLoading            | Render loading icon via render function                                                 | `() => React.ReactNode`                          |                         | No       |
| optionComponent          | Option component to render option item                                                  | `React.ComponentType | React.ReactNode`          |                         | No       |
| renderOption             | Render option item via render function                                                  | `(props) => React.ReactNode`                     |                         | No       |
| optionGroupComponent     | Option group component to render option group                                           | `React.ComponentType | React.ReactNode`          |                         | No       |
| renderOptionGroup        | Render option group via render function                                                 | `(props) => React.ReactNode`                     |                         | No       |
| compareFunc              | Compare function to compare two option, return `true` if equal otherwise return `false` | `(option1, option2) => boolean`                  |                         | No       |
| onShowDropdown           | Callback function is called when dropdown will be shown                                 | `() => void`                                     |                         | No       |
| onHideDropdown           | Callback function is called when dropdown will be hide                                  | `() => void`                                     |                         | No       |
| onSelectOption           | Callback function is called when an option is selected                                  | `(option1) => void`                              |                         | No       |
| buttonWrapperStyle       | Additional styles for button's wrapper                                                  | `object`                                         |                         | No       |
| buttonContainerStyle     | Additional styles for button's container                                                | `object`                                         |                         | No       |
| buttonLabelStyle         | Additional styles for button's label                                                    | `object`                                         |                         | No       |
| buttonIconStyle          | Additional styles for button's icon                                                     | `object`                                         |                         | No       |
| dropdownStyle            | Additional styles for dropdown's container                                              | `object`                                         |                         | No       |
| optionStyle              | Additional styles for option's container                                                | `object`                                         |                         | No       |
| selectedOptionStyle      | Additional styles for selected option's container                                       | `object`                                         |                         | No       |
| disabledOptionStyle      | Additional styles for disabled option's container                                       | `object`                                         |                         | No       |
| optionLabelStyle         | Additional styles for option's label                                                    | `object`                                         |                         | No       |
| selectedOptionLabelStyle | Additional styles for selected option's label                                           | `object`                                         |                         | No       |
| disabledOptionLabelStyle | Additional styles for disabled option's label                                           | `object`                                         |                         | No       |
| optionGroupPadding       | Padding left for nested option group                                                    | `number`                                         |                         | No       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
