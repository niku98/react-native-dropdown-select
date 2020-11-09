import { StyleSheet } from 'react-native';
import { DROPDOWN_MAX_HEIGHT, DROPDOWN_MIN_WIDTH } from '../constants';

export const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: 500,
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    overflow: 'hidden',
    minWidth: DROPDOWN_MIN_WIDTH,
    minHeight: 20,
    maxHeight: DROPDOWN_MAX_HEIGHT,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  dropdownContainerPositionTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
