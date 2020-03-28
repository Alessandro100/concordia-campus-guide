import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import Location from './classes/location';
import CampusPolygons from './constants/CampusPolygons';
import Colors from './constants/Colors';
import OutdoorPOI from './classes/outdoorPOI';
import IndoorFloor from './classes/indoorFloor';
import PolygonsAndMarkers from './components/PolygonsAndMarkers';
import IndoorFloorService from './services/indoorFloorService';
import SearchBar from './components/SearchBar';
import BottomDrawerBuilding from './components/BottomDrawerBuilding';
import Building from './classes/building';
import { obtainBuildings } from './services/buildingService';
import IndoorFloorMap from './components/IndoorFloorMap';
import Coordinate from './classes/coordinate';
import ToyData from './constants/indoor-data/toy-data'
import Campus from './classes/campus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});







type appState = {
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
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    /**
     * Code to Test Nadia's Additions
     */

    ////////////////////////////////////////////


    //BuildingService.init();
    IndoorFloorService.init();

    this.state = {
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      building: null,
      markers: [],
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
    };
  }

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

  /* Needed to pass callback to child (PolygonsAndMarkers.tsx) to update parent state (App.tsx) */
  displayBuildingInfo = (building: Building, displayInfo: boolean) => {
    this.setState({ displayInfo });
    this.setState({ building });
  };

  render() {
    const { region, buildings, polygons, displayInfo, building } = this.state;
    let floor = IndoorFloorService.getFloor('Hall', 1);

    return (
      <View style={styles.container}>    

        <IndoorFloorMap indoorFloor={floor}/>    

        
        {/* <SearchBar setMapLocation={this.setMapLocation} />
        <CampusToggleButton setMapLocation={this.setMapLocation} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={region}
          showsUserLocation
        >
          <PolygonsAndMarkers
            buildings={buildings}
            polygons={polygons}
            displaybuilding={this.displayBuildingInfo}
          />
          <ShowDirection
            startLocation={new OutdoorPOI(new Location(45.458488, -73.639862), 'test-start')}
            endLocation={new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end')}
            transportType={transportMode.transit}
          />
        </MapView> 
        <BottomDrawerBuilding
          displayInfo={displayInfo}
          building={building}
          displayBuildingInfo={this.displayBuildingInfo}
        /> */}
      </View>
    );
  }
}
export default App;
