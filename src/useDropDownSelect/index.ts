import { useCallback, useEffect, useState } from 'react';
import type { DropdownOption, DropdownSelectConfig } from '../types';
import { isDropdownOption } from '../utils';

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
  const [selectedOption, setSelectedOption] = useState<DropdownOption>();
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

  const chooseOption = useCallback(
    (option: DropdownOption, fireEvent: boolean = true) => {
      if (fireEvent) {
        callChooseOptionEventListeners(option);
        hideDropdown();
      }
      setSelectedOption(option);
    },
    [callChooseOptionEventListeners, hideDropdown]
  );

  const compareOption = useCallback(
    (option1?: DropdownOption, option2?: DropdownOption) => {
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

  useEffect(() => {
    if (defaultValue) {
      for (const option of options) {
        const isCurrentOption = isDropdownOption(defaultValue)
          ? compareOption(option, defaultValue)
          : defaultValue === option.value;
        if (isCurrentOption) {
          chooseOption(option);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (value) {
      for (const option of options) {
        const isCurrentOption = isDropdownOption(value)
          ? compareOption(option, value)
          : value === option.value;
        if (isCurrentOption) {
          chooseOption(option, false);
          break;
        }
      }
    }
  }, [chooseOption, compareOption, options, value]);

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
    chooseOption,
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
