import React, {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import OptionItem from '../OptionItem';
import { styles } from './styles';
import type {
  DropdownButtonProps,
  DropdownOption,
  DropdownOptionProps,
  DropdownSelectConfig,
  Layout,
  Position,
} from '../types';
import { isEmptyChildren, isFunction } from '../utils';
import { DROPDOWN_MIN_WIDTH } from '../constants';
import { useDropdownSelect } from '../useDropDownSelect';
import { DropdownButton } from '../DropdownButton';
import { getStatusBarHeight } from 'react-native-status-bar-height';

function DropdownSelect<T = any>({
  component,
  children,
  render,

  loadingComponent,
  renderLoading,

  optionComponent,
  renderOption,

  position = 'bottom',
  placeholder = 'Select an option...',
  loading,
  withStatusBar = true,

  buttonWrapperStyle,

  buttonContainerStyle,
  buttonLabelStyle,
  buttonIconStyle,

  dropdownStyle,

  optionStyle,
  selectedOptionStyle,

  optionLabelStyle,
  selectedOptionLabelStyle,
  ...configs
}: DropdownSelectConfig<T>) {
  const { options } = configs;

  /**
   * Dropdown configs
   */
  const {
    showDropdown,
    hideDropdown,
    show,
    chooseOption,
    selectedOption,
    addHideEventListener,
    addShowEventListener,
    removeHideEventListener,
    removeShowEventListener,
    compareOption,
  } = useDropdownSelect(configs);

  /**
   * Animation
   */
  const animationValue = useRef(new Animated.Value(0)).current;
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const onShowDropdownWithAnimation = useCallback(() => {
    setIsDropdownShown(true);

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animationValue]);

  const onHideDropdownWithAnimation = useCallback(() => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start((result) => {
      if (result.finished) {
        setIsDropdownShown(false);
      }
    });
  }, [animationValue]);

  useEffect(() => {
    addShowEventListener(onShowDropdownWithAnimation);
    addHideEventListener(onHideDropdownWithAnimation);

    return () => {
      removeShowEventListener(onShowDropdownWithAnimation);
      removeHideEventListener(onHideDropdownWithAnimation);
    };
  }, [
    addHideEventListener,
    addShowEventListener,
    onHideDropdownWithAnimation,
    onShowDropdownWithAnimation,
    removeHideEventListener,
    removeShowEventListener,
  ]);

  /**
   * Dropdown Position
   */
  const [containerLayout, setContainerLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [dropdownContainerHeight, setDropdownContainerHeight] = useState(0);

  const containerRef = useRef<TouchableOpacity>(null);

  const measureContainer = useCallback(() => {
    containerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setContainerLayout({ x: pageX, y: pageY, width, height });
    });
  }, []);

  const measureDropdownContainer = useCallback((e: any) => {
    setDropdownContainerHeight(e.nativeEvent.layout.height);
  }, []);

  const dropdownContainerPositionStyles: ViewStyle = useMemo(() => {
    const top = containerLayout.y + containerLayout.height;
    const left = containerLayout.x;
    const width =
      containerLayout.width > DROPDOWN_MIN_WIDTH
        ? containerLayout.width
        : DROPDOWN_MIN_WIDTH;

    let positionStyles: Position = {
      top: top - 1 - (withStatusBar ? 0 : getStatusBarHeight()),
      left: left,
      width,
    };

    if (position === 'top') {
      positionStyles.top =
        containerLayout.y -
        dropdownContainerHeight +
        1 -
        (withStatusBar ? 0 : getStatusBarHeight());
    }

    return positionStyles;
  }, [
    containerLayout.height,
    containerLayout.width,
    containerLayout.x,
    containerLayout.y,
    dropdownContainerHeight,
    position,
    withStatusBar,
  ]);

  useEffect(() => {
    addShowEventListener(measureContainer);
    return () => {
      removeShowEventListener(measureContainer);
    };
  }, [addShowEventListener, measureContainer, removeShowEventListener]);

  /**
   * Animation translate
   */
  const dropdownContainerTranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      position === 'bottom'
        ? -dropdownContainerHeight / 2
        : dropdownContainerHeight / 2,
      0,
    ],
    easing: Easing.linear,
    extrapolate: 'clamp',
  });

  /**
   * Combine styles
   */
  const combinedWrapperStyle = useMemo(() => {
    return [buttonWrapperStyle];
  }, [buttonWrapperStyle]);

  const combinedDropdownStyle = useMemo(() => {
    return [
      styles.dropdownContainer,
      dropdownContainerPositionStyles,
      position === 'top' ? styles.dropdownContainerPositionTop : {},
      {
        transform: [
          { translateY: dropdownContainerTranslateY },
          { scaleY: animationValue },
        ],
        opacity: animationValue,
      },
      dropdownStyle,
    ];
  }, [
    animationValue,
    dropdownContainerPositionStyles,
    dropdownContainerTranslateY,
    dropdownStyle,
    position,
  ]);

  /**
   * Render
   */
  const buttonProps: DropdownButtonProps = useMemo(() => {
    return {
      show,
      selectedOption,
      position,
      placeholder,
      loading,
      style: buttonContainerStyle,
      labelStyle: buttonLabelStyle,
      iconStyle: buttonIconStyle,
    };
  }, [
    show,
    selectedOption,
    position,
    placeholder,
    loading,
    buttonContainerStyle,
    buttonLabelStyle,
    buttonIconStyle,
  ]);

  const computedChildren = useMemo(() => {
    return component
      ? createElement(component as any, buttonProps)
      : render
      ? render(buttonProps)
      : children
      ? isFunction(children)
        ? children(buttonProps)
        : !isEmptyChildren(children)
        ? React.Children.only(children)
        : createElement(DropdownButton as any, buttonProps)
      : createElement(DropdownButton as any, buttonProps);
  }, [component, children, render, buttonProps]);

  const computedLoadingComponent = useMemo(() => {
    return loadingComponent
      ? createElement(loadingComponent as any)
      : renderLoading
      ? renderLoading()
      : null;
  }, [loadingComponent, renderLoading]);

  const renderItem = useCallback(
    ({ item: option }: { item: DropdownOption }) => {
      const optionProps: DropdownOptionProps = {
        option: option,
        active: compareOption(selectedOption, option),
        style: optionStyle,
        activeStyle: selectedOptionStyle,
        labelStyle: optionLabelStyle,
        activeLableStyle: selectedOptionLabelStyle,
      };

      const optionPressed = () => {
        chooseOption(option);
      };

      return (
        <TouchableOpacity onPress={optionPressed}>
          {optionComponent
            ? createElement(optionComponent as any, optionProps)
            : renderOption
            ? renderOption(optionProps)
            : createElement(OptionItem, optionProps)}
        </TouchableOpacity>
      );
    },
    [
      chooseOption,
      compareOption,
      optionComponent,
      optionLabelStyle,
      optionStyle,
      renderOption,
      selectedOption,
      selectedOptionLabelStyle,
      selectedOptionStyle,
    ]
  );

  return (
    <>
      <TouchableOpacity
        ref={containerRef}
        onPress={showDropdown}
        style={combinedWrapperStyle}
        activeOpacity={1}
      >
        {computedChildren}
      </TouchableOpacity>
      <Modal
        visible={isDropdownShown}
        onDismiss={hideDropdown}
        onRequestClose={hideDropdown}
        transparent
      >
        <TouchableWithoutFeedback onPress={hideDropdown}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <Animated.View
          onLayout={measureDropdownContainer}
          style={combinedDropdownStyle}
        >
          <FlatList
            renderItem={renderItem}
            data={options}
            keyExtractor={(item, index) => item.label + index.toString()}
          />
          {loading && computedLoadingComponent}
        </Animated.View>
      </Modal>
    </>
  );
}

export { DropdownSelect };
