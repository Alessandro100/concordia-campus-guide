import { StyleSheet } from 'react-native';
import Colors from './Colors';

const autocompleteStyle = StyleSheet.create({
  btnStyling: {
    width: 250,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10
  },
  startSuggestions: {
    position: "relative",
    left: 65,
    top: 55,
    zIndex: 10,
    width: 250,
    height: 45,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 5
  },
  startInput: {
    position: "absolute",
    zIndex:3,
    left: 65,
    top: 18,
    width: 250,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10
  },
  destSuggestions: {
    position: "relative",
    left: 65,
    top: 66,
    zIndex: 10,
    width: 250,
    height: 45,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 5
  },
  destInput: {
    position: "relative",
    zIndex:4,
    left: 65,
    top: 69.5,
    width: 250,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10
  }
});
export default autocompleteStyle;
