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

export interface DropdownOption<T = any> {
  value: T;
  label: string;
}

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

export interface DropdownOptionProps {
  option: DropdownOption;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeStyle?: StyleProp<ViewStyle>;
  activeLableStyle?: StyleProp<TextStyle>;
}

export interface DropdownSelectConfig<T = any> {
  component?: React.ComponentType<DropdownButtonProps> | React.ReactNode;
  render?: (props: DropdownButtonProps) => React.ReactElement;
  children?:
    | ((props: DropdownButtonProps) => React.ReactElement)
    | React.ReactNode;

  /**
   * Loading Component
   */
  loadingComponent?: React.ComponentType | React.ReactNode;
  renderLoading?: () => React.ReactElement;

  /**
   * Option Component
   */
  optionComponent?: React.ComponentType<DropdownOptionProps> | React.ReactNode;
  renderOption?: (props: DropdownOptionProps) => React.ReactElement;

  options: DropdownOption<T>[];
  defaultValue?: T;
  value?: T;
  position?: DropdownPositioin;
  placeholder?: string;
  loading?: boolean;
  withStatusBar?: boolean;

  /**
   * Callbacks
   */
  compareFunc?: (
    selectedOption: DropdownOption<T>,
    option: DropdownOption<T>
  ) => boolean;
  onShowDropdown?: () => void;
  onHideDropdown?: () => void;
  onSelectOption?: (option: DropdownOption<T>) => void;

  /**
   * Styles
   */
  buttonWrapperStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonLabelStyle?: StyleProp<TextStyle>;
  buttonIconStyle?: StyleProp<ImageStyle>;

  dropdownStyle?: StyleProp<ViewStyle>;

  optionStyle?: StyleProp<ViewStyle>;
  selectedOptionStyle?: StyleProp<ViewStyle>;

  optionLabelStyle?: StyleProp<TextStyle>;
  selectedOptionLabelStyle?: StyleProp<TextStyle>;
}
