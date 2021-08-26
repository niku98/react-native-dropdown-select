import { useCallback, useEffect, useState } from 'react';
import type {
  DropdownOption,
  DropdownOptionItem,
  DropdownSelectConfig,
} from '../types';
import { isDropdownOptionItem } from '../utils';

export const useDropdownSelect = ({
  defaultValue,
  options,
  compareFunc,
  onShowDropdown,
  onHideDropdown,
  onSelectOption,
  value,
}: DropdownSelectConfig) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOptionItem>();
  const [showEventListeners, setShowEventListener] = useState<
    CallableFunction[]
  >([]);
  const [hideEventListeners, setHideEventListener] = useState<
    CallableFunction[]
  >([]);
  const [chooseOptionEventListeners, setChooseOptionEventListener] = useState<
    CallableFunction[]
  >([]);

  /**
   * Event listener
   */
  const callShowEventListeners = useCallback(() => {
    showEventListeners.forEach((listener) => {
      listener();
    });
  }, [showEventListeners]);

  const addShowEventListener = useCallback((callback: CallableFunction) => {
    setShowEventListener((state) => {
      const newState = [...state];
      newState.push(callback);
      return newState;
    });
  }, []);

  const removeShowEventListener = useCallback((callback: CallableFunction) => {
    setShowEventListener((state) => {
      const newState = [...state];
      const index = newState.findIndex((listener) => listener === callback);
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    });
  }, []);

  const callHideEventListeners = useCallback(() => {
    hideEventListeners.forEach((listener) => {
      listener();
    });
  }, [hideEventListeners]);

  const addHideEventListener = useCallback((callback: CallableFunction) => {
    setHideEventListener((state) => {
      const newState = [...state];
      newState.push(callback);
      return newState;
    });
  }, []);

  const removeHideEventListener = useCallback((callback: CallableFunction) => {
    setHideEventListener((state) => {
      const newState = [...state];
      const index = newState.findIndex((listener) => listener === callback);
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    });
  }, []);

  const callChooseOptionEventListeners = useCallback(
    (option: DropdownOption) => {
      chooseOptionEventListeners.forEach((listener) => {
        listener(option);
      });
    },
    [chooseOptionEventListeners]
  );

  const addChooseOptionEventListener = useCallback(
    (callback: CallableFunction) => {
      setChooseOptionEventListener((state) => {
        const newState = [...state];
        newState.push(callback);
        return newState;
      });
    },
    []
  );

  const removeChooseOptionEventListener = useCallback(
    (callback: CallableFunction) => {
      setChooseOptionEventListener((state) => {
        const newState = [...state];
        const index = newState.findIndex((listener) => listener === callback);
        if (index > -1) {
          newState.splice(index, 1);
        }
        return newState;
      });
    },
    []
  );

  const showDropdown = useCallback(() => {
    callShowEventListeners();
    setShow(true);
  }, [callShowEventListeners]);

  const hideDropdown = useCallback(() => {
    callHideEventListeners();
    setShow(false);
  }, [callHideEventListeners]);

  const selectOption = useCallback(
    (option: DropdownOptionItem, fireEvent: boolean = true) => {
      if (fireEvent) {
        callChooseOptionEventListeners(option);
        hideDropdown();
      }
      setSelectedOption(option);
    },
    [callChooseOptionEventListeners, hideDropdown]
  );

  const compareOption = useCallback(
    (option1?: DropdownOptionItem, option2?: DropdownOptionItem) => {
      if (!option1 || !option2) {
        return false;
      }

      if (compareFunc) {
        return compareFunc(option1, option2);
      }

      return option1.value === option2.value;
    },
    [compareFunc]
  );

  const findOptionMatchValue = useCallback(
    (
      val: any,
      inputOptions?: DropdownOption[]
    ): DropdownOptionItem | undefined => {
      if (!inputOptions) {
        inputOptions = options;
      }

      if (val !== undefined) {
        for (const option of inputOptions) {
          if (isDropdownOptionItem(option)) {
            const isCurrentOption = isDropdownOptionItem(val)
              ? compareOption(option, val)
              : val === option.value;
            if (isCurrentOption) {
              return option;
            }
          } else {
            const matchedOption = findOptionMatchValue(val, option.options);
            if (matchedOption) {
              return matchedOption;
            }
          }
        }
      }

      return undefined;
    },
    [options, compareOption, isDropdownOptionItem]
  );

  useEffect(() => {
    setSelectedOption(findOptionMatchValue(defaultValue));
  }, []);

  useEffect(() => {
    setSelectedOption(findOptionMatchValue(value));
  }, [value]);

  useEffect(() => {
    if (onShowDropdown) {
      addShowEventListener(onShowDropdown);
    }
    if (onHideDropdown) {
      addHideEventListener(onHideDropdown);
    }
    if (onSelectOption) {
      addChooseOptionEventListener(onSelectOption);
    }

    return () => {
      if (onShowDropdown) {
        removeShowEventListener(onShowDropdown);
      }
      if (onHideDropdown) {
        removeHideEventListener(onHideDropdown);
      }
      if (onSelectOption) {
        removeChooseOptionEventListener(onSelectOption);
      }
    };
  }, [
    addChooseOptionEventListener,
    addHideEventListener,
    addShowEventListener,
    onHideDropdown,
    onSelectOption,
    onShowDropdown,
    removeChooseOptionEventListener,
    removeHideEventListener,
    removeShowEventListener,
  ]);

  return {
    show,
    showDropdown,
    hideDropdown,
    selectOption,
    selectedOption,
    addShowEventListener,
    addHideEventListener,
    addChooseOptionEventListener,
    removeShowEventListener,
    removeHideEventListener,
    removeChooseOptionEventListener,
    compareOption,
  };
};
