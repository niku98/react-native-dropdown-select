import { Children } from 'react';
import type { DropdownOption } from './types';

export function isFunction(f: any): f is CallableFunction {
  return typeof f === 'function';
}

export function isEmptyChildren(children: any) {
  return Children.count(children) === 0;
}

export function isDropdownOption(option: any): option is DropdownOption {
  return typeof option === 'object' && 'value' in option && 'label' in option;
}
