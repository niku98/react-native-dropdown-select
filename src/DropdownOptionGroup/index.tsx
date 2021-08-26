import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OptionItem from '../OptionItem';
import type {
  DropdownOption,
  DropdownOptionGroupProps,
  DropdownOptionItem,
  DropdownOptionProps,
  DropdownSelectConfig,
} from '../types';
import { getRenderComponent, isDropdownOptionItem } from '../utils';
import { styles } from './styles';

const DropdownOptionGroup = ({
  group,
  compareOption,
  optionProps,
  onOptionPress,
  optionComponent,
  renderOption,
  selectedOption,
  deep = 1,
  padding = 8,
}: DropdownOptionGroupProps) => {
  const renderItem: ListRenderItem<DropdownOption> = React.useCallback(
    ({ item: option }) => {
      return renderOptionItemOrGroup({
        ...optionProps,
        style: [
          optionProps.style,
          {
            paddingLeft: (deep + 1) * padding,
          },
        ],
        selectedOption,
        renderOption,
        optionComponent,
        selectOption: onOptionPress,
        option,
        compareOption,
        deep: deep + 1,
        optionGroupPadding: padding,
      });
    },
    [optionProps, selectedOption, renderOption, onOptionPress, deep, padding]
  );

  const renderHeader = React.useCallback(() => {
    return (
      <View style={{ paddingLeft: deep * padding }}>
        {typeof group.label === 'string' ? (
          <Text numberOfLines={1} style={[styles.title]}>
            {group.label}
          </Text>
        ) : (
          group.label
        )}
      </View>
    );
  }, [group, deep, padding]);

  return (
    <FlatList
      data={group.options}
      renderItem={renderItem}
      keyExtractor={(option, index) =>
        isDropdownOptionItem(option)
          ? option.value
          : (typeof option.label === 'string' ? option.label : index) +
            '-' +
            option.options.length
      }
      ListHeaderComponent={renderHeader}
    />
  );
};

export default DropdownOptionGroup;

interface RenderOptionProps
  extends Omit<DropdownOptionProps, 'active' | 'option'>,
    Omit<DropdownOptionGroupProps, 'group' | 'onOptionPress' | 'optionProps'>,
    Pick<
      DropdownSelectConfig,
      'optionGroupComponent' | 'renderOptionGroup' | 'optionGroupPadding'
    > {
  selectOption: (option: DropdownOptionItem) => void;
  option: DropdownOption;
}

export function renderOptionItemOrGroup({
  compareOption,
  selectedOption,
  renderOption,
  optionComponent,
  style,
  disabledStyle,
  activeStyle,
  labelStyle,
  disabledLabelStyle,
  activeLabelStyle,
  option,
  selectOption,
  optionGroupComponent,
  renderOptionGroup,
  deep,
  optionGroupPadding,
}: RenderOptionProps) {
  if (isDropdownOptionItem(option)) {
    const optionProps: DropdownOptionProps = {
      option: option,
      active: selectedOption ? compareOption(selectedOption, option) : false,
      style,
      activeStyle,
      labelStyle,
      activeLabelStyle,
      disabledLabelStyle,
      disabledStyle,
    };

    const optionPressed = () => {
      selectOption(option);
    };

    return (
      <TouchableOpacity disabled={option.disabled} onPress={optionPressed}>
        {getRenderComponent(optionProps, optionComponent, renderOption) || (
          <OptionItem {...optionProps} />
        )}
      </TouchableOpacity>
    );
  } else {
    const optionProps: Omit<DropdownOptionProps, 'active' | 'option'> = {
      style,
      activeStyle,
      labelStyle,
      activeLabelStyle,
      disabledStyle,
      disabledLabelStyle,
    };
    console.log({ deep });

    const groupProps: DropdownOptionGroupProps = {
      group: option,
      optionProps,
      selectedOption,
      compareOption,
      optionComponent,
      renderOption,
      onOptionPress: selectOption,
      padding: optionGroupPadding,
    };

    return (
      getRenderComponent(
        groupProps,
        optionGroupComponent,
        renderOptionGroup
      ) || <DropdownOptionGroup {...groupProps} />
    );
  }
}
