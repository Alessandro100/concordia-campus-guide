import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
} from "react-native";
import CampusEventContainer from "./CampusEventContainer";
import Building from "../classes/building";
import { obtainBuildings } from "../services/buildingService";
import styles from "../constants/MenuStyling";
import ColorBlindSettings from "../components/ColorBlindSettings";
import colorBlindMode from "../classes/colorBlindMode";
import Colors, { ColorPicker } from "../constants/Colors";

class Menu extends Component<
  {},
  {
    showMenu: boolean;
    showEvent: boolean;
    showSettings: boolean;
    buildings: Building[];
    building: Building;
    colorBlindMode: colorBlindMode;
    setColorBlindMode: Function;
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      showEvent: false,
      showSettings: false,
      buildings: obtainBuildings(),
      building: new Building("", "", null, null, "", null, "H"),
      setColorBlindMode: props.setColorBlindMode,
      colorBlindMode: props.colorBlindMode,
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.colorBlindMode !== prevProps.colorBlindMode) {
      this.setState({ colorBlindMode: this.props.colorBlindMode });
    }
  }
  // boolean state to show menu (modal)
  ShowMenu() {
    this.setState({ showMenu: true });
  }
  // boolean state to close menu (modal)
  closeMenu() {
    this.setState({ showMenu: false });
  }
  // boolean state to close event (modal)
  closeEvents() {
    this.setState({ showEvent: false });
  }
  // boolean state to close settings (modal)
  closeSettings() {
    this.setState({ showSettings: false });
  }
  // closes menu and settings and shows event (modal)
  switchToEvent() {
    this.setState({ showMenu: false });
    this.setState({ showSettings: false });
    this.setState({ showEvent: true });
  }
  // closes menu and event and shows settings (modal)
  switchToSettings() {
    this.setState({ showMenu: false });
    this.setState({ showEvent: false });
    this.setState({ showSettings: true });
  }
  changeBuildingSelected = (itemValue: Building) => {
    this.setState({ building: itemValue });
  };

  render() {
    const {
      colorBlindMode,
      setColorBlindMode,
      showMenu,
      showEvent,
      showSettings,
      buildings,
      building,
    } = this.state;
    return (
      <View style={styles.container}>
        {/* menu icon button */}
        <TouchableOpacity
          testID="menuModal"
          style={styles.hamburger}
          onPress={() => this.ShowMenu()}
        >
          <Image
            style={styles.iconSize}
            source={require("../assets/menu.png")}
          />
        </TouchableOpacity>
        {/* menu modal */}
        <Modal animationType="fade" transparent={true} visible={showMenu}>
          {/* button outside the modal to close menu modal (All the screen except the menu modal) */}
          <TouchableOpacity
            testID="closeMenuModal"
            onPress={() => this.closeMenu()}
            style={styles.outsideModal}
          ></TouchableOpacity>
          {/* Menu content */}
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
            <TouchableOpacity
              testID="eventModal"
              onPress={() => this.switchToEvent()}
              style={styles.menuOptions}
            >
              <Image
                style={styles.iconMenu}
                source={require("../assets/event.png")}
              />
              <Text>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="settingsModal"
              onPress={() => this.switchToSettings()}
              style={styles.menuOptions}
            >
              <Image
                style={styles.iconMenu}
                source={require("../assets/settings.png")}
              />
              <Text>Settings</Text>
            </TouchableOpacity>
            <View style={styles.aboutLine}></View>
            <TouchableOpacity style={styles.menuOptions}>
              <Text>About</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* Event modal */}
        <Modal animationType="fade" transparent={true} visible={showEvent}>
          {/* button outside the modal to close event modal (All the screen except the event modal) */}
          <TouchableOpacity
            testID="closeEventModal"
            onPress={() => this.closeEvents()}
            style={styles.outsideModal}
          ></TouchableOpacity>
          {/* event content */}
          <View style={styles.modalEventSettingsContainer}>
            <Text>Choose a buiding to display the events ... </Text>
            <View style={styles.pickContainer}>
              <Picker
                selectedValue={building}
                style={styles.buildPicker}
                onValueChange={(itemValue: Building) =>
                  this.changeBuildingSelected(itemValue)
                }
              >
                {buildings.map((buildingItem) => (
                  <Picker.Item
                    key={buildingItem.getIdentifier()}
                    label={buildingItem.getName()}
                    value={buildingItem}
                  />
                ))}
              </Picker>
            </View>
            <CampusEventContainer buildingId={building.identifier} />
          </View>
        </Modal>
        {/* settings Modal */}
        <Modal animationType="fade" transparent={true} visible={showSettings}>
          {/* button outside the modal to close menu modal (All the screen except the menu modal) */}
          <TouchableOpacity
            testID="closeSettingsModal"
            onPress={() => this.closeSettings()}
            style={styles.outsideModal}
          ></TouchableOpacity>
          <View style={styles.modalEventSettingsContainer}>
            <ColorBlindSettings
              setColorBlindMode={setColorBlindMode.bind(this)}
              colorBlindMode={colorBlindMode}
              closeSettings={this.closeSettings.bind(this)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default Menu;
