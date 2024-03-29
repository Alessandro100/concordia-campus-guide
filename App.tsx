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
import DirectionInput from "./components/DirectionInput";
import Autocomplete from "./components/AutoCompleteInput";
import { stylesWithColorBlindSupport } from "./constants/AppStyling";
import PointOfInterest from "./classes/pointOfInterest";
import PlacesOfInterestAround from "./components/PlacesOfInterestAround";
import Menu from "./components/Menu";
import colorBlindMode from "./classes/colorBlindMode";
import Colors, { ColorPicker } from "./constants/Colors";
let styles = stylesWithColorBlindSupport(ColorPicker(colorBlindMode.normal));
import OutdoorPOI from "./classes/outdoorPOI";

type appState = {
  places: any[];
  userPosition: Location;
  outdoorPoint: OutdoorPOI;
  polygons: any[];
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  colorBlindMode: colorBlindMode;
  displayInfo: boolean;
  building: Building;
  buildings: Building[];
  displayIndoor: boolean;
  indoorFloor: IndoorFloor;
  startDirection: PointOfInterest;
  endDirection: PointOfInterest;
  selectedTransportMode: transportMode;
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    //BuildingService.init();
    IndoorFloorService.init();

    this.state = {
      userPosition: new Location(45.497406, -73.577102),
      outdoorPoint: new OutdoorPOI(null, ""),
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      colorBlindMode: colorBlindMode.normal,
      places: [],
      building: null,
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
      displayIndoor: false,
      startDirection: null,
      endDirection: null,
      indoorFloor: null,
      selectedTransportMode: null
    };
    //Global for GoogleCalendarEventContainer
    global.signedIn = false;
  }
  //callback for setting the colorBlindMode for the application
  setColorBlindMode = (colorBlindMode: colorBlindMode) => {
    this.setState({ colorBlindMode: colorBlindMode });
  };

  //set all places (around region) to be display in markersAndPolygone
  setGooglePlacesMarkers = (allpaces: any[]) => {
    this.setState({ places: allpaces });
  };

  callbackAllInfo = (type: string, poi: PointOfInterest, inOrOut: boolean) => {
    if (type === "Start") {
      this.setState({ startDirection: poi });
    } else {
      this.setState({ endDirection: poi });
    }
  };

  //navigate to building from current location
  navigateFromCurrentPosition = (poi: OutdoorPOI) => {
    const { outdoorPoint, userPosition } = this.state;
    outdoorPoint.setLocation(userPosition);
    this.setState({ startDirection: outdoorPoint });
    this.setState({ endDirection: poi });
  };

  //sets the input destination
  setDestinationPoint = (poi: OutdoorPOI) => {
    this.setState({ outdoorPoint: poi });
    this.setState({ endDirection: poi });
  };

  //changes region in the mapview
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

  setTransportationMethod = (selectedTransportMode: transportMode) => {
    this.setState({selectedTransportMode: selectedTransportMode})
  }

  //call back function to display indoor or outdoor map
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

  //update current position
  changeCurrentPosition = (coordinate: any) => {
    const { userPosition } = this.state;
    userPosition.setLatitude(coordinate.latitude);
    userPosition.setLongitude(coordinate.longitude);
  };

  inOrOutView() {
    const {
      region,
      colorBlindMode,
      buildings,
      polygons,
      displayInfo,
      building,
      displayIndoor,
      startDirection,
      endDirection,
      indoorFloor,
      places,
      outdoorPoint,
      selectedTransportMode
    } = this.state;
    styles = stylesWithColorBlindSupport(ColorPicker(colorBlindMode));
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
            defaultInput={null}
            lat={region.latitude}
            lng={region.longitude}
          />
           <Menu
            setColorBlindMode={this.setColorBlindMode.bind(this)}
            colorBlindMode={colorBlindMode}
          />
          <PlacesOfInterestAround
            lat={region.latitude}
            long={region.longitude}
            showPlaces={this.setGooglePlacesMarkers}
          />
          <CampusToggleButton
            setMapLocation={this.setMapLocation}
            colorBlindMode={colorBlindMode}
          />
          <DirectionInput
            destination={outdoorPoint}
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            setTransportationMethod={this.setTransportationMethod}
            lat={region.latitude}
            lng={region.longitude}
          />

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={(e) =>
              this.changeCurrentPosition(e.nativeEvent.coordinate)
            }
          >
            <PolygonsAndMarkers
              places={places}
              buildings={buildings}
              polygons={polygons}
              displaybuilding={this.displayBuildingInfo}
              colorBlindMode={colorBlindMode}
            />
            {startDirection && endDirection && selectedTransportMode &&(
              <ShowDirection
                startLocation={startDirection}
                endLocation={endDirection}
                transportType={selectedTransportMode}
              />
            )}
          </MapView>
          <CurrentPosition setMapLocation={this.setMapLocation} />

          <BottomDrawerBuilding
            setDestination={this.setDestinationPoint}
            navigate={this.navigateFromCurrentPosition}
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
