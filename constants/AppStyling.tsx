import { Dimensions, StyleSheet } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: "center",
      justifyContent: "center"
    },
    search: {
      width: 320,
      height: 40,
      backgroundColor: Colors.white,
      position: "absolute",
      zIndex: 4,
      alignSelf: "center",
      top: 50,
      borderColor: Colors.black,
      borderWidth: 0.5,
      padding: 10
    },
    iconSize: {
      height: 20,
      width: 20,
    },
    options:{
      borderColor: Colors.grey,
      borderWidth: 0.3,
      paddingRight: 27,
      paddingLeft: 27,
      paddingBottom:10,
      paddingTop:10,
      borderRadius:20,
      marginLeft:3,
      marginRight:3,
      backgroundColor:Colors.whiteWithOpacity,
    },
    optionsContainer: {
      flexDirection:'row',
      position: "absolute",
      zIndex: 4,
      alignSelf: "center",
      top: 145,
      margin:5,
    
    },
  
    searchSugg: {
      width: 320,
      position: "relative",
      top: 62,
      zIndex: 10,
      height: 45,
      borderColor: Colors.black,
      backgroundColor: Colors.white,
      borderWidth: 0.5,
      padding: 5,
      alignSelf: "center"
    },
    searchInput: {
      width: 320,
      position: "absolute",
      alignSelf: "center",
      top: 26,
      height: 40,
      borderColor: Colors.black,
      backgroundColor: Colors.white,
      borderWidth: 0.5,
      padding: 10
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  });
export default styles;