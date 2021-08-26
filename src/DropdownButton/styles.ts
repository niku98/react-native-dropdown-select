import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingLeft: 8,
    paddingRight: 30,
    borderRadius: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  label: {
    marginRight: 5,
    color: 'black',
  },
  placeholder: {
    color: '#999',
    marginRight: 5,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 8,
  },
});
