import { Dimensions, StyleSheet } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    position: 'absolute',
    zIndex: 3,
    top: 50,
  },
  row: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: Colors.white,
    zIndex: 3,
  },
  textInput: {
    height: 30,
  },
  textInputContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 2,
  },
  description: {
    fontWeight: 'bold',
  },
  predefinedPlacesDescription: {
    color: Colors.searchBarPlaces,
  },
});
export default styles;
