import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  InteractionManager,
  LayoutChangeEvent,
  ListRenderItem,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { DROPDOWN_MIN_WIDTH } from '../constants';
import type {
  DropdownOption,
  DropdownPositioin,
  Layout,
  Position,
} from '../types';
import { styles } from './styles';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { isDropdownOptionItem } from '../utils';

interface DropdownModalProps {
  visible: boolean;
  onDismiss?: () => void;
  onDismissed?: () => void;
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  renderItem?: ListRenderItem<DropdownOption>;
  options?: DropdownOption[];
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  buttonLayout: Layout;
  position?: DropdownPositioin;
}

const DropdownModalContent = ({
  visible,
  onDismiss,
  onDismissed,
  dropdownContainerStyle,
  renderItem,
  options,
  loading,
  loadingComponent,
  buttonLayout,
  position,
}: DropdownModalProps) => {
  /**
   * Animation
   */
  const animationValue = useRef(new Animated.Value(0)).current;

  const show = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [animationValue]);

  const hide = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start((result) => {
        if (result.finished) {
          onDismissed && onDismissed();
        }
      });
    });
  }, [animationValue, onDismissed]);

  useEffect(() => {
    visible ? show() : hide();
  }, [visible]);

  /**
   * Dropdown Position
   */
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const [dropdownContainerHeight, setDropdownContainerHeight] = useState(0);

  const measureDropdownContainer = useCallback((e: LayoutChangeEvent) => {
    setDropdownContainerHeight(e.nativeEvent.layout.height);
  }, []);

  const dropdownContainerPositionStyles: ViewStyle = useMemo(() => {
    const top = buttonLayout.y + buttonLayout.height;
    const left = buttonLayout.x;
    const width =
      buttonLayout.width > DROPDOWN_MIN_WIDTH
        ? buttonLayout.width
        : DROPDOWN_MIN_WIDTH;

    let positionStyles: Position = {
      top: top - 1 - (frame.y > 0 ? 0 : insets.top),
      left: left,
      width,
    };

    if (position === 'top') {
      positionStyles.top =
        buttonLayout.y -
        dropdownContainerHeight +
        1 -
        (frame.y > 0 ? 0 : insets.top);
    }

    return positionStyles;
  }, [buttonLayout, dropdownContainerHeight, position, frame, insets]);

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

  return (
    <>
      <TouchableWithoutFeedback style={styles.backdrop} onPress={onDismiss}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View
        onLayout={measureDropdownContainer}
        style={[
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
          dropdownContainerStyle,
        ]}
      >
        <FlatList
          renderItem={renderItem}
          data={options}
          keyExtractor={(item, index) =>
            isDropdownOptionItem(item)
              ? item.value?.toString()
              : (typeof item.label === 'string' ? item.label : index) +
                '-' +
                item.options.length
          }
          ListFooterComponent={() => <>{loading && loadingComponent}</>}
        />
      </Animated.View>
    </>
  );
};

export default DropdownModalContent;
