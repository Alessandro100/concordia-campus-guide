import React, { Component } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CampusToggleButton from "./components/CampusToggleButton";
import ShowDirection from "./components/ShowDirection";
import transportMode from "./classes/transportMode";
import Location from "./classes/location";
import CampusPolygons from "./constants/CampusPolygons";
import IndoorFloor from "./classes/indoorFloor";
import PolygonsAndMarkers from "./components/PolygonsAndMarkers";
import IndoorFloorService from "./services/indoorFloorService";
import BottomDrawerBuilding from "./components/BottomDrawerBuilding";
import Building from "./classes/building";
import { obtainBuildings } from "./services/buildingService";
import IndoorFloorMap from "./components/IndoorFloorMap";
import CurrentPosition from "./components/CurrentPosition";
import InputBtn from "./components/DirectionInput";
import Autocomplete from "./components/AutoCompleteInput";
import styles from "./constants/AppStyling";
import PointOfInterest from "./classes/pointOfInterest";
import PlacesOfInterestAround from "./components/PlacesOfInterestAround";
import Menu from "./components/Menu";

type appState = {
  places: any[];
  userPosition: Location;
  polygons: any[];
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  displayInfo: boolean;
  building: Building;
  buildings: Building[];
  displayIndoor: boolean;
  indoorFloor: IndoorFloor;
  startDirection: PointOfInterest;
  endDirection: PointOfInterest;
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    //BuildingService.init();
    IndoorFloorService.init();

    this.state = {
      userPosition: new Location(45.497406, -73.577102),
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      places: [],
      building: null,
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
      displayIndoor: false,
      startDirection: null,
      endDirection: null,
      indoorFloor: null,
    };
  }
  setGooglePlacesMarkers = (allpaces: any[]) => {
    this.setState({ places: allpaces });
  };

  callbackAllInfo = (type: string, poi: PointOfInterest, inOrOut: boolean) => {
    if (type === "Start") {
      this.setState({ startDirection: poi });
      if (inOrOut === true) {
        //this.setState({ start_identifier: id });
      }
    } else {
      this.setState({ endDirection: poi });
      if (inOrOut === true) {
        //this.setState({ end_identifier: id });
      }
    }
  };

  setMapLocation = (location: Location) => {
    this.setState({
      region: {
        latitude: location.getLatitude(),
        longitude: location.getLongitude(),
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
    });
  };

  callbackInOut = (status: boolean) => {
    const { building } = this.state;
    if (status) {
      let floor = IndoorFloorService.getFloor(building.title, 1);
      this.setState({ displayIndoor: status, indoorFloor: floor });
    } else {
      this.setState({ displayIndoor: status, indoorFloor: null });
    }
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
      startDirection,
      endDirection,
      indoorFloor,
      places,
    } = this.state;

    if (displayIndoor === false) {
      return (
        <View style={styles.container}>
          <Autocomplete
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            btnStyle={styles.search}
            styleSugg={styles.searchSugg}
            styleInput={styles.searchInput}
            type="Search"
            lat={region.latitude}
            lng={region.longitude}
          />
           <Menu/>
          <PlacesOfInterestAround
            lat={region.latitude}
            long={region.longitude}
            showPlaces={this.setGooglePlacesMarkers}
          />
          <CampusToggleButton setMapLocation={this.setMapLocation} />
          <InputBtn
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            lat={region.latitude}
            lng={region.longitude}
          />

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={(coordinates) =>
              this.changeCurrentPosition(coordinates)
            }
          >
            <PolygonsAndMarkers
              places={places}
              buildings={buildings}
              polygons={polygons}
              displaybuilding={this.displayBuildingInfo}
            />
            {startDirection && endDirection && (
              <ShowDirection
                startLocation={startDirection}
                endLocation={endDirection}
                transportType={transportMode.transit}
              />
            )}
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
    } else {
      return (
        <IndoorFloorMap
          indoorFloor={indoorFloor}
          indoorDisplay={this.callbackInOut}
          startLocation={startDirection}
          endLocation={endDirection}
        />
      );
    }
  }

  render() {
    return this.inOrOutView();
  }
}
export default App;
