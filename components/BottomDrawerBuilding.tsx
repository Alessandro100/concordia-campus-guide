import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import Building from "../classes/building";
import Colors from "../constants/Colors";
import CampusEventContainer from "./CampusEventContainer";
import IndoorFloorService from "../services/indoorFloorService";
import PointOfInterest from "../classes/pointOfInterest";
import OutdoorPOI from "../classes/outdoorPOI";

const styles = StyleSheet.create({
  contentContainer: {
    padding: 5,
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: Colors.mapMarkerColor,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  titleBuilding: {
    fontSize: 25,
    color: Colors.primaryColor,
    textAlign: "left",
    paddingRight: 2,
    paddingLeft: 4,
  },
  location: {
    color: Colors.grey,
    textAlign: "left",
    fontStyle: "italic",
    paddingRight: 4,
    paddingLeft: 4,
  },
  descriptionContainer: {
    padding: 10,
    height: 90,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    textAlign: "left",
    paddingRight: 4,
    paddingLeft: 4,
  },
  indoorBtn: {
    margin: 5,
  },
  startEndContainer: {
    flexDirection: "row",
    width: "100%",
  },
  textDirections: {
    color: Colors.white,
    fontWeight: "bold",
  },
  directionOption: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: 140,
    height: 35,
    borderWidth: 0.8,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
    borderRadius: 20,
  },
  startOption: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: 100,
    borderRadius: 20,
    marginLeft: 5,
    height: 35,
    borderWidth: 0.8,
    backgroundColor: Colors.polygonFill,
    borderColor: Colors.polygonStroke,
  },
  iconSizeDirections: {
    width: 25,
    height: 25,
  },
});

type BottomDrawerBuildingProps = {
  building: Building;
  displayInfo: boolean;
  navigate(poi: PointOfInterest): void;
  setDestination(poi: PointOfInterest): void;
  displayBuildingInfo(building: Building, displayInfo: boolean): void;
  indoorDisplay(displayIndoor: boolean): void;
};

type BottomDrawerBuildingState = {
  building: Building;
  displayInfo: boolean;
  outdoorPoint: OutdoorPOI;
};

const TAB_BAR_HEIGHT = 0;

class BottomDrawerBuilding extends Component<
  BottomDrawerBuildingProps,
  BottomDrawerBuildingState
> {
  constructor(props) {
    super(props);
    const { building, displayInfo } = this.props;
    this.state = {
      building,
      displayInfo,
      outdoorPoint: new OutdoorPOI(null, ""),
    };
  }

  componentDidUpdate(prevProps) {
    const { displayInfo } = this.props;
    if (displayInfo !== prevProps.displayInfo) {
      this.changeState();
    }
  }

  changeToIndoorView = (stat: boolean) => {
    const { indoorDisplay } = this.props;
    indoorDisplay(stat);
  };

  //sets the building to the destination input
  setAsDestination = (building: Building) => {
    const { outdoorPoint } = this.state;
    outdoorPoint.setLocation(building.location);
    outdoorPoint.setLongitude(building.name);
    const { setDestination } = this.props;
    setDestination(outdoorPoint);
  };

  // sets the start poit to current location and end point to the building selected
  navigateToThisBuilding = (building: Building) => {
    const { outdoorPoint } = this.state;
    outdoorPoint.setLocation(building.location);
    outdoorPoint.setLongitude(building.name);
    const { navigate } = this.props;
    navigate(outdoorPoint);
  };

  changeState() {
    const { displayInfo } = this.props;
    const { building } = this.props;
    this.setState({ displayInfo });
    this.setState({ building });
  }

  renderContent = (building: Building) => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleBuilding}>{building.getName()}</Text>
        <Text style={styles.location}>
          Location: [{building.getLocation().getLatitude()},{" "}
          {building.getLocation().getLongitude()}]
        </Text>
        <View style={styles.indoorBtn}>
          {IndoorFloorService.getAvailableIndoorFloorsForBuilding(
            building.title
          ).length > 0 && (
            <Button
              title="Indoor Navigation"
              color={Colors.primaryColor}
              onPress={() => this.changeToIndoorView(true)}
            />
          )}
          <View style={styles.startEndContainer}>
            <TouchableOpacity
              style={styles.directionOption}
              onPress={() => this.setAsDestination(building)}
            >
              <Image
                style={styles.iconSizeDirections}
                source={require("../assets/directions.png")}
              />
              <Text style={styles.textDirections}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.startOption}
              onPress={() => this.navigateToThisBuilding(building)}
            >
              <Image
                style={styles.iconSize}
                source={require("../assets/nav.png")}
              />
              <Text>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{building.getDescription()}</Text>
        </ScrollView>
        <CampusEventContainer buildingId={this.state.building.identifier} />
      </View>
    );
  };

  render() {
    const { building, displayInfo } = this.state;
    const { displayBuildingInfo } = this.props;
    if (displayInfo === true) {
      return (
        <BottomDrawer
          style={styles.contentContainer}
          containerHeight={500}
          offset={TAB_BAR_HEIGHT}
          downDisplay={400}
          startUp={false}
          onCollapsed={() => {
            displayBuildingInfo(building, false);
          }}
        >
          {this.renderContent(building)}
        </BottomDrawer>
      );
    }
    return null;
  }
}
export default BottomDrawerBuilding;
