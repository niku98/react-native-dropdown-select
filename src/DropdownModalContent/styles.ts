import { StyleSheet } from 'react-native';
import { DROPDOWN_MAX_HEIGHT, DROPDOWN_MIN_WIDTH, screen } from '../constants';

export const styles = StyleSheet.create({
  backdrop: {
    width: screen.width,
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
    borderLeftWidth: 1,
    borderLeftColor: '#dddddd',
    borderRightWidth: 1,
    borderRightColor: '#dddddd',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  dropdownContainerPositionTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
