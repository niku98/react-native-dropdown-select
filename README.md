# React Native Dropdown Select

A Dropdown select component for React Native. Easy to use without any configuration.

## Table of contents
- [React Native Dropdown Select](#react-native-dropdown-select)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [With npm](#with-npm)
    - [With yarn](#with-yarn)
  - [Usage](#usage)
    - [When Status bar is hidden or translucent](#when-status-bar-is-hidden-or-translucent)
  - [Props](#props)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

### With npm
```sh
npm install @niku/react-native-dropdown-select
```

### With yarn
```sh
yarn add @niku/react-native-dropdown-select
```

## Usage

```js
// ...
import DropdownSelect from 'react-native-dropdown-select';

// ...

const options = [
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
  },
];

const defaultValue = 'js';

function App() {
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
```

### When Status bar is hidden or translucent
If your app doesn't show status bar or make it translucent, you have to change **`withStatusBar`** option to **`false`**
```js
<DropdownSelect options={options} withStatusBar={false} />;
```

## Props
| Name                     | Description                                                                             | Type                                             | Default                 | Required |
| ------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------- | -------- |
| options                  | List of option for dropdown                                                             | `array`                                          |                         | Yes      |
| defaultValue             | Default value to display                                                                | `any`                                            |                         | No       |
| value                    | Current value of dropdown select                                                        | `any`                                            |                         | No       |
| position                 | Position of dropdown                                                                    | `'top' | 'bottom'`                               | `'bottom'`              | No       |
| placeholder              | Placeholder of dropdown select to display when no option selected                       | `string`                                         | `'Select an option...'` | No       |
| loading                  | Loading state of dropdown select                                                        | `boolean`                                        | `false`                 | No       |
| withStatusBar            | Default is `true`, change it to `false` if status bar is **hidden** or **translucent**  | `boolean`                                        | `true`                  | No       |
| component                | Component to render dropdown button                                                     | `React.ComponentType | React.ReactNode`          |                         | No       |
| render                   | Render dropdown button via render function                                              | `(props) => React.ReactElement`                  |                         | No       |
| children                 | Loading state of dropdown select                                                        | `(props) => React.ReactElemnt | React.ReactNode` |                         | No       |
| loadingComponent         | Loading component to render loading icon                                                | `React.ComponentType | React.ReactNode`          |                         | No       |
| renderLoading            | Render loading icon via render function                                                 | `() => React.ReactElement`                       |                         | No       |
| optionComponent          | Option component to render option item                                                  | `React.ComponentType | React.ReactNode`          |                         | No       |
| renderOption             | Render option item via render function                                                  | `(props) => React.ReactElement`                  |                         | No       |
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
| optionLabelStyle         | Additional styles for option's label                                                    | `object`                                         |                         | No       |
| selectedOptionLabelStyle | Additional styles for selected option's label                                           | `object`                                         |                         | No       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
