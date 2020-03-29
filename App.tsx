import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CampusToggleButton from "./components/CampusToggleButton";
import ShowDirection from "./components/ShowDirection";
import transportMode from "./classes/transportMode";
import Location from "./classes/location";
import CampusPolygons from "./constants/CampusPolygons";
import Colors from "./constants/Colors";
import OutdoorPOI from "./classes/outdoorPOI";
import PolygonsAndMarkers from "./components/PolygonsAndMarkers";
import BottomDrawerBuilding from "./components/BottomDrawerBuilding";
import Building from "./classes/building";
import { obtainBuildings } from "./services/BuildingService";
import CurrentPosition from "./components/CurrentPosition";
import InputBtn from "./components/DirectionInput";
import Autocomplete from "./components/AutoCompleteInput";
import Navbtn from "./components/NavBtn";
import styles from "./constants/AppStyling";

type appState = {
  userPosition: Location;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  polygons: any[];
  markers: any[];
  displayInfo: boolean;
  building: Building;
  buildings: Building[];
  displayIndoor: boolean;
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
  start_identifier: string;
  end_identifier: string;
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    this.state = {
      userPosition: new Location(45.497406, -73.577102),
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01
      },
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
      displayIndoor: false,
      start_x: -1,
      start_y: -1,
      end_x: -1,
      end_y: -1,
      start_identifier: "",
      end_identifier: ""
    };
  }
  // gives the info of start and destination (indoor and outdoor)
  callbackAllInfo = (
    x: number,
    y: number,
    type: string,
    id: string,
    inOrOut: boolean
  ) => {
    if (type === "Start") {
      this.setState({ start_x: x });
      this.setState({ start_y: y });
      if (inOrOut === true) {
        this.setState({ start_identifier: id });
      }
    } else {
      this.setState({ end_x: x });
      this.setState({ end_y: y });
      if (inOrOut === true) {
        this.setState({ end_identifier: id });
      }
    }
  };

  setMapLocation = (location: Location) => {
    this.setState({
      region: {
        latitude: location.getLatitude(),
        longitude: location.getLongitude(),
        latitudeDelta: 0,
        longitudeDelta: 0.01
      }
    });
  };

  callbackInOut = (status: boolean) => {
    this.setState({ displayIndoor: status });
  };

  /* Needed to pass callback to child (PolygonsAndMarkers.tsx) to update parent state (App.tsx) */
  displayBuildingInfo = (building: Building, displayInfo: boolean) => {
    this.setState({ displayInfo });
    this.setState({ building });
  };

  changeCurrentPosition = (coordinate: any) => {
    const { userPosition } = this.state;
    userPosition.setLatitude(coordinate.latitude);
    userPosition.setLongitude(coordinate.longitude);
  };

  inOrOutView() {
    const {
      region,
      buildings,
      polygons,
      displayInfo,
      building,
      displayIndoor,
      userPosition,
      start_x,
      start_y,
      end_x,
      end_y,
      start_identifier,
      end_identifier
    } = this.state;

    if (displayIndoor === false) {
      return (
        <View style={styles.container}>
          {/* <SearchBar setMapLocation={this.setMapLocation} /> */}
          <Autocomplete
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            btnStyle={styles.search}
            styleSugg={styles.searchSugg}
            styleInput={styles.searchInput}
            type="Search"
            lat={userPosition.getLatitude()}
            lng={userPosition.getLongitude()}
          />
          <CampusToggleButton setMapLocation={this.setMapLocation} />
          <InputBtn
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            lat={userPosition.getLatitude()}
            lng={userPosition.getLongitude()}
          />
          <Navbtn
            getNavInfo={this.callbackAllInfo}
            start_x={start_x}
            start_y={start_y}
            end_x={end_x}
            end_y={end_y}
            sid={start_identifier}
            eid={end_identifier}
          />
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={coordinates =>
              this.changeCurrentPosition(coordinates)
            }
          >
            <PolygonsAndMarkers
              buildings={buildings}
              polygons={polygons}
              displaybuilding={this.displayBuildingInfo}
            />
            <ShowDirection
              startLocation={
                new OutdoorPOI(
                  new Location(45.458488, -73.639862),
                  "test-start"
                )
              }
              endLocation={
                new OutdoorPOI(new Location(45.50349, -73.572182), "test-end")
              }
              transportType={transportMode.transit}
            />
          </MapView>
          <CurrentPosition setMapLocation={this.setMapLocation} />
          <BottomDrawerBuilding
            displayInfo={displayInfo}
            building={building}
            displayBuildingInfo={this.displayBuildingInfo}
            indoorDisplay={this.callbackInOut}
          />
        </View>
      );
    }
    return <Text>indoor component </Text>;
  }

  render() {
    return this.inOrOutView();
  }
}
export default App;
