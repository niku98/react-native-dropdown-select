import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Position = {
  top?: number;
  left?: number;
  bottom?: number;
  width?: number;
};

export type DropdownPositioin = 'top' | 'bottom';

export interface DropdownOptionItem<T = any> {
  value: T;
  label: string | React.ReactNode;
  disabled?: boolean;
}

export interface DropdownOptionGroup<T> {
  label: string | React.ReactNode;
  options: DropdownOption<T>[];
}

export type DropdownOption<T = any> =
  | DropdownOptionItem<T>
  | DropdownOptionGroup<T>;

export interface DropdownSelectProps {
  show: boolean;
  selectedOption?: DropdownOption;
  position: DropdownPositioin;
  placeholder: string;
  loading?: boolean;
}

export interface DropdownButtonProps extends DropdownSelectProps {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
}

export interface DropdownOptionProps<T = any> {
  option: DropdownOptionItem<T>;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style for selected option
   */
  activeStyle?: StyleProp<ViewStyle>;
  /**
   * Style for selected label option
   */
  activeLabelStyle?: StyleProp<TextStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledLabelStyle?: StyleProp<TextStyle>;
}

export interface DropdownOptionGroupProps<T = any> {
  selectedOption?: DropdownOptionItem<T>;
  group: DropdownOptionGroup<T>;
  optionProps: Omit<DropdownOptionProps, 'option' | 'active'>;
  padding?: number;
  compareOption: (
    option1: DropdownOptionItem<T>,
    option2: DropdownOptionItem<T>
  ) => boolean;

  /**
   * Select option function will be passed
   */
  onOptionPress: (option: DropdownOptionItem) => void;

  /**
   * Option Component
   */
  optionComponent?: React.ComponentType<DropdownOptionProps<T>>;

  /**
   * Render function to render an option
   */
  renderOption?: (props: DropdownOptionProps<T>) => React.ReactNode;

  deep?: number;
}

export interface DropdownSelectConfig<T = any> {
  /**
   * Button's component
   */
  component?: React.ComponentType<DropdownButtonProps>;

  /**
   * Render function to render button
   */
  render?: (props: DropdownButtonProps) => React.ReactNode;

  /**
   * Render button with children
   */
  children?:
    | ((props: DropdownButtonProps) => React.ReactNode)
    | React.ReactNode;

  /**
   * Loading Component
   */
  loadingComponent?: React.ComponentType;

  /**
   * Render function to render loading
   */
  renderLoading?: () => React.ReactElement;

  /**
   * Option Component
   */
  optionComponent?: React.ComponentType<DropdownOptionProps<T>>;

  /**
   * Render function to render an option
   */
  renderOption?: (props: DropdownOptionProps<T>) => React.ReactNode;

  /**
   * Option group Component
   */
  optionGroupComponent?: React.ComponentType<DropdownOptionGroupProps<T>>;

  /**
   * Render function to render an option group
   */
  renderOptionGroup?: (props: DropdownOptionGroupProps<T>) => React.ReactNode;

  /**
   * Dropdown's option
   */
  options: DropdownOption<T>[];

  /**
   * The default value
   */
  defaultValue?: T;
  value?: T;
  position?: DropdownPositioin;
  placeholder?: string;
  loading?: boolean;

  /**
   * The compare function to check if value is selected
   */
  compareFunc?: (
    selectedOption: DropdownOption<T>,
    option: DropdownOption<T>
  ) => boolean;

  /**
   * Callback when dropdown will be shown
   */
  onShowDropdown?: () => void;

  /**
   * Callback when dropdown will be hide
   */
  onHideDropdown?: () => void;

  /**
   * Callback when user select an option
   */
  onSelectOption?: (option: DropdownOptionItem<T>) => void;

  /**
   * Style for button wrapper
   */
  buttonWrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Style for button container
   */
  buttonContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for button label
   */
  buttonLabelStyle?: StyleProp<TextStyle>;

  /**
   * Style for button placeholder
   */
  buttonPlaceholderStyle?: StyleProp<TextStyle>;

  /**
   * Style for button arrow icon
   */
  buttonIconStyle?: StyleProp<ImageStyle>;

  /**
   * Style for dropdown
   */
  dropdownStyle?: StyleProp<ViewStyle>;

  /**
   * Style for option
   */
  optionStyle?: StyleProp<ViewStyle>;

  /**
   * Style for selected option
   */
  selectedOptionStyle?: StyleProp<ViewStyle>;

  /**
   * Style for disabled option
   */
  disabledOptionStyle?: StyleProp<ViewStyle>;

  /**
   * Style for option's label
   */
  optionLabelStyle?: StyleProp<TextStyle>;

  /**
   * Style for selected option's label
   */
  selectedOptionLabelStyle?: StyleProp<TextStyle>;

  /**
   * Style for disabled option's label
   */
  disabledOptionLabelStyle?: StyleProp<TextStyle>;

  /**
   * Padding left for option group when nested
   */
  optionGroupPadding?: number;
}
