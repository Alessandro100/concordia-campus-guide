import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = function(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
    search: {
      width: 320,
      height: 40,
      backgroundColor: colors.white,
      position: "absolute",
      zIndex: 4,
      alignSelf: "center",
      top: 50,
      borderColor: colors.black,
      borderWidth: 0.5,
      paddingLeft: 50,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    iconSize: {
      height: 20,
      width: 20,
    },
    options: {
      borderColor: colors.grey,
      borderWidth: 0.3,
      paddingRight: 27,
      paddingLeft: 27,
      paddingBottom: 10,
      paddingTop: 10,
      borderRadius: 20,
      marginLeft: 3,
      marginRight: 3,
      backgroundColor: colors.whiteWithOpacity,
    },
    optionsContainer: {
      flexDirection: "row",
      position: "absolute",
      zIndex: 4,
      alignSelf: "center",
      top: 145,
      margin: 5,
    },

    searchSugg: {
      width: 320,
      position: "relative",
      top: 62,
      zIndex: 10,
      height: 45,
      borderColor: colors.black,
      backgroundColor: colors.white,
      borderWidth: 0.5,
      padding: 5,
      alignSelf: "center",
    },
    searchInput: {
      width: 320,
      position: "absolute",
      alignSelf: "center",
      top: 26,
      height: 40,
      borderColor: colors.black,
      backgroundColor: colors.white,
      borderWidth: 0.5,
      padding: 10,
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
  });
};
const stylesWithColorBlindSupport = styles;

export { stylesWithColorBlindSupport };