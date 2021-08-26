import React, { Children, createElement } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import type {
  DropdownOptionGroup as IDropdownOptionGroup,
  DropdownOptionItem,
} from './types';

export function isFunction(f: any): f is CallableFunction {
  return typeof f === 'function';
}

export function isEmptyChildren(children: any) {
  return Children.count(children) === 0;
}

export function isDropdownOptionItem(
  option: any
): option is DropdownOptionItem {
  return option !== null && typeof option === 'object'
    ? 'value' in option && 'label' in option
    : false;
}

export function isDropdownOptionGroup(
  option: any
): option is IDropdownOptionGroup<any> {
  return option !== null && typeof option === 'object'
    ? 'options' in option && 'label' in option
    : false;
}

export function getRenderComponent<Props = any>(
  props: Props,
  component?: React.ElementType<Props>,
  render?: (props: Props) => React.ReactNode,
  node?: React.ReactNode
) {
  return component
    ? createElement(component as any, props)
    : render
    ? render(props)
    : node
    ? isFunction(node)
      ? node(props)
      : !isEmptyChildren(node)
      ? React.Children.only(node)
      : null
    : null;
}

export function getPaddingLeft(style: StyleProp<ViewStyle>) {
  style = StyleSheet.flatten(style);
  return style.paddingLeft ?? style.paddingHorizontal ?? style.padding;
}
