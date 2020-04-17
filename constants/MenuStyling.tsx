import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "flex-start",
  },
  iconSize: {
    width: 31,
    height: 31,
  },

  hamburger: {
    position: "absolute",
    zIndex: 9,
    top: 50,
    left: 25,
    margin:5
  },
  outsideModal: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: Colors.black,
    zIndex: 1,
    opacity: 0.7,
  },
  modalContainer: {
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").height,
    zIndex: 2,
    position: "absolute",
    backgroundColor: Colors.white,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalEventSettingsContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    top: 120,
    width: 300,
    height: 350,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.white,
    padding: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalLogo: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.menuBeige,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  logoSize: {
    alignSelf: "center",
    marginBottom: 10,
  },
  syncBtn: {
    backgroundColor: Colors.primaryColor,
    height: 30,
    width: "100%",
    color: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  syncText: {
    color: Colors.white,
  },
  menuOptions: {
    width: "100%",
    height: 40,
    alignSelf: "flex-start",
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  aboutLine: {
    backgroundColor: Colors.grey,
    width: "100%",
    height: 1,
    opacity: 0.4,
  },
  iconMenu: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  pickContainer: {
    marginTop: 15,
    borderWidth: 0.4,
  },
  buildPicker: {
    width: 250,
    height: 30,
  },
});
export default styles;
