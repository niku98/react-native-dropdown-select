import { Dimensions } from 'react-native';

export const screen = {
  get width() {
    return Dimensions.get('window').width;
  },
  get height() {
    return Dimensions.get('window').height;
  },
};

export const DROPDOWN_MIN_WIDTH = 0;
export const DROPDOWN_MIN_HEIGHT = 20;
export const DROPDOWN_MAX_HEIGHT = 200;
