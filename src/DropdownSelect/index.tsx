import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import type {
  DropdownButtonProps,
  DropdownOption,
  DropdownSelectConfig,
  Layout,
} from '../types';
import { getRenderComponent } from '../utils';
import { useDropdownSelect } from '../useDropDownSelect';
import { DropdownButton } from '../DropdownButton';
import DropdownModalContent from '../DropdownModalContent';
import { DropdownLoading } from '../DropdownLoading';
import { renderOptionItemOrGroup } from '../DropdownOptionGroup';

function DropdownSelect<T = any>({
  component,
  children,
  render,

  loadingComponent,
  renderLoading,

  optionComponent,
  renderOption,

  optionGroupComponent,
  renderOptionGroup,

  position = 'bottom',
  placeholder = 'Select an option...',
  loading,

  buttonWrapperStyle,

  buttonContainerStyle,
  buttonLabelStyle,
  buttonIconStyle,
  buttonPlaceholderStyle,

  dropdownStyle,

  optionStyle,
  selectedOptionStyle,
  disabledOptionStyle,

  optionLabelStyle,
  selectedOptionLabelStyle,
  disabledOptionLabelStyle,

  optionGroupPadding,
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
    selectOption,
    selectedOption,
    compareOption,
    addHideEventListener,
    addShowEventListener,
    removeHideEventListener,
    removeShowEventListener,
  } = useDropdownSelect(configs);

  /**
   * Button position
   */
  const [containerLayout, setContainerLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<TouchableOpacity>(null);

  const measureContainer = useCallback((callback: () => void) => {
    containerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setContainerLayout({ x: pageX, y: pageY, width, height });
      callback();
    });
  }, []);

  /**
   * Dropdown modal visible
   */
  const [modalVisible, setModalVisible] = useState(show);
  const [dropdownContentVisible, setDropdownContentVisible] = useState(show);

  const handleDropdownModalContentDismissed = useCallback(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    const onShow = () => {
      measureContainer(() => {
        setModalVisible(true);
        setDropdownContentVisible(true);
      });
    };
    addShowEventListener(onShow);

    const onHide = () => {
      measureContainer(() => {
        setDropdownContentVisible(false);
      });
    };
    addHideEventListener(onHide);

    return () => {
      removeShowEventListener(onShow);
      removeHideEventListener(onHide);
    };
  }, [addHideEventListener, addShowEventListener]);

  /**
   * Combine styles
   */
  const combinedWrapperStyle = useMemo(() => {
    return [buttonWrapperStyle];
  }, [buttonWrapperStyle]);

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
      placeholderStyle: buttonPlaceholderStyle,
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
    buttonPlaceholderStyle,
  ]);

  const computedChildren = useMemo(() => {
    const childrenElement = getRenderComponent(
      buttonProps,
      component,
      render,
      children
    );
    return childrenElement || <DropdownButton {...buttonProps} />;
  }, [component, children, render, buttonProps]);

  const computedLoadingComponent = useMemo(() => {
    const loadingElement = getRenderComponent(
      {},
      loadingComponent,
      renderLoading
    );
    return loadingElement || <DropdownLoading />;
  }, [loadingComponent, renderLoading]);

  const renderItem = useCallback(
    ({ item: option }: { item: DropdownOption }) => {
      return renderOptionItemOrGroup({
        compareOption,
        renderOption,
        renderOptionGroup,
        selectedOption,
        optionGroupComponent,
        optionComponent,
        style: optionStyle,
        disabledStyle: disabledOptionStyle,
        labelStyle: optionLabelStyle,
        disabledLabelStyle: disabledOptionLabelStyle,
        activeStyle: selectedOptionStyle,
        activeLabelStyle: selectedOptionLabelStyle,
        selectOption,
        option,
        optionGroupPadding,
      });
    },
    [
      selectOption,
      compareOption,
      optionComponent,
      optionLabelStyle,
      optionStyle,
      renderOption,
      selectedOption,
      selectedOptionLabelStyle,
      selectedOptionStyle,
      optionGroupComponent,
      renderOptionGroup,
      disabledOptionStyle,
      disabledOptionLabelStyle,
      optionGroupPadding,
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
      <Modal visible={modalVisible} transparent>
        <DropdownModalContent
          visible={dropdownContentVisible}
          onDismiss={hideDropdown}
          onDismissed={handleDropdownModalContentDismissed}
          dropdownContainerStyle={dropdownStyle}
          options={options}
          renderItem={renderItem}
          loading={loading}
          loadingComponent={computedLoadingComponent}
          buttonLayout={containerLayout}
          position={position}
        />
      </Modal>
    </>
  );
}

export { DropdownSelect };
