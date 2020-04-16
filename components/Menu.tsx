import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  iconSize: {
    width: 30,
    height: 30,
  },

  hamburger: {
    position: "absolute",
    zIndex: 9,
    alignSelf: "flex-start",
    top: 8,
    left: 25,
    margin: 5,
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
});

class Menu extends Component<
  {},
  {
    showMenu: boolean;
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
     
    
    };
  }

  ShowZeMenu() {
    this.setState({ showMenu: true });
  }
  closeZeMenu() {
    this.setState({ showMenu: false });
  }
  
  render() {
    const {
      showMenu,
    } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => this.ShowZeMenu()}
        >
          <Image
            style={styles.iconSize}
            source={require("../assets/menu.png")}
          />
        </TouchableOpacity>
        <Modal animationType="fade" transparent={true} visible={showMenu}>
          <TouchableOpacity
            onPress={() => this.closeZeMenu()}
            style={styles.outsideModal}
          ></TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalLogo}>
              <Image
                style={styles.logoSize}
                source={require("../assets/logo.png")}
              />
              <TouchableOpacity style={styles.syncBtn}>
                <Text style={styles.syncText}> Sync. Calendar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.menuOptions}>
              <Image
                style={styles.iconMenu}
                source={require("../assets/bus.png")}
              />
              <Text>Shuttle Bus Schedule</Text>
            </TouchableOpacity>
           {/*  */}
            <View style={styles.aboutLine}></View>
            <TouchableOpacity style={styles.menuOptions}>
              <Text>About</Text>
            </TouchableOpacity>
            {/*  */}
          </View>
        </Modal>

       
      </View>
    );
  }
}

export default Menu;
