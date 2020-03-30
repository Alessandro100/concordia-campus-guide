import { StyleSheet } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
  modal: {
    height: 170,
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
    top: 25,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  row1: {
    height: 120,
    zIndex: 100,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",

    position: "relative"
  },
  row2: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    zIndex: 2,
    position: "relative",
    paddingLeft: 5,
    paddingRight: 5
  },
  iconSize: {
    height: 25,
    width: 25
  },
  sizeColumn1: {
    width: 40,
    paddingLeft: 10
  },
  sizeColumn2: {
    alignItems: "center",
    flexDirection: "column"
  },
  sizeColumn3: {
    paddingTop: 17,
    flexDirection: "column",
    zIndex: 10
  },

  bigDot: {
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
    height: 13,
    width: 13,
    marginTop: 5,
    marginBottom: 5
  },
  dest: {
    height: 25,
    width: 25,
    marginTop: 3
  },
  dots: {
    height: 25,
    width: 25
  },
  sizeColumn4: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: 10
  },
  invert: {
    marginTop: 20,
    height: 30,
    width: 30
  },

  navOptions: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 0.5,
    padding: 5
  },
  optionTxt: {
    fontSize: 12,
    padding: 5
  },

  navBtn: {
    alignSelf: "flex-end",
    flexDirection: "column",
    zIndex: 2,
    position: "absolute",
    bottom: 50,
    right: 30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default styles;
