import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import Location from './classes/location';
import CampusPolygons from './constants/CampusPolygons';
import IndoorFloor from './classes/indoorFloor';
import PolygonsAndMarkers from './components/PolygonsAndMarkers';
import IndoorFloorService from './services/indoorFloorService';
import BottomDrawerBuilding from './components/BottomDrawerBuilding';
import Building from './classes/building';
import { obtainBuildings } from './services/buildingService';
import IndoorFloorMap from './components/IndoorFloorMap';
import CurrentPosition from "./components/CurrentPosition";
import InputBtn from "./components/DirectionInput";
import Autocomplete from "./components/AutoCompleteInput";
import Navbtn from "./components/NavBtn";
import {stylesWithColorBlindSupport} from "./constants/AppStyling";
import PointOfInterest from './classes/pointOfInterest';
import PlacesAround from './components/PlacesAround';
import Menu from './components/Menu';
import colorBlindMode from './classes/colorBlindMode';
import Colors, { ColorPicker } from './constants/Colors';
let styles = stylesWithColorBlindSupport(ColorPicker(colorBlindMode.normal))

type appState = {
  places: any[];
  userPosition: Location;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  colorBlindMode: colorBlindMode,
  polygons: any[];
  markers: any[];
  displayInfo: boolean;
  building: Building;
  buildings: Building[];
  displayIndoor: boolean;
  indoorFloor: IndoorFloor;
  startDirection: PointOfInterest;
  endDirection: PointOfInterest;
  start_identifier: string;
  end_identifier: string;
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
        longitudeDelta: 0.01
      },
      colorBlindMode: colorBlindMode.normal,
      places:[],
      building: null,
      markers: [],
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
      displayIndoor: false,
      startDirection: null,
      endDirection: null,
      indoorFloor: null,
      start_identifier: "",
      end_identifier: ""
    };
  }
  callBackMarkers= (allpaces:any) => {
    this.setState({places: allpaces})};

  callbackAllInfo = (
    type: string,
    poi: PointOfInterest,
    inOrOut: boolean
  ) => {
    if (type === "Start") {
      this.setState({startDirection: poi})
      if (inOrOut === true) {
        //this.setState({ start_identifier: id });
      }
    } else {
      this.setState({endDirection: poi})
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
        longitudeDelta: 0.01
      }
    });
  };

  callbackInOut = (status: boolean) => {
    const {building} = this.state;
    if(status) {
      let floor = IndoorFloorService.getFloor(building.title, 1);
      this.setState({ displayIndoor: status, indoorFloor: floor });
    }else {
      this.setState({ displayIndoor: status, indoorFloor: null });
    }
  };
  setColorBlindMode = (colorBlindMode: colorBlindMode) => {
    this.setState({colorBlindMode: colorBlindMode});
  }
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
      colorBlindMode,
      buildings,
      polygons,
      displayInfo,
      building,
      displayIndoor,
      userPosition,
      startDirection,
      endDirection,
      start_identifier,
      indoorFloor,
      places,
      end_identifier
    } = this.state;
    styles = stylesWithColorBlindSupport(ColorPicker(colorBlindMode))
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
          <Menu setColorBlindMode={this.setColorBlindMode.bind(this)} colorBlindMode={colorBlindMode}/>
          <PlacesAround
            lat={userPosition.getLatitude()}
            long={userPosition.getLongitude()}
            showPlaces={this.callBackMarkers}/>
          <CampusToggleButton setMapLocation={this.setMapLocation} colorBlindMode={colorBlindMode}/>
          <InputBtn
            getNavInfo={this.callbackAllInfo}
            setMapLocation={this.setMapLocation}
            lat={userPosition.getLatitude()}
            lng={userPosition.getLongitude()}
          />
          {/* <Navbtn
            getNavInfo={this.callbackAllInfo}
            // start_x={start_x}
            // start_y={start_y}
            // end_x={end_x}
            // end_y={end_y}
            // sid={start_identifier}
            // eid={end_identifier}
          /> */}
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
              places={places}
              buildings={buildings}
              polygons={polygons}
              displaybuilding={this.displayBuildingInfo}
            />
            {(startDirection && endDirection) && (
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
      return(
        <IndoorFloorMap
          indoorFloor={indoorFloor}
          indoorDisplay={this.callbackInOut}
          startLocation={startDirection}
          endLocation={endDirection}
        />
      )
    }
  }

  render() {

    return this.inOrOutView();
  }
}
export default App;
