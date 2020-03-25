import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import Location from './classes/location';
import CampusPolygons from './constants/CampusPolygons';
import Colors from './constants/Colors';
import OutdoorPOI from './classes/outdoorPOI';
import PolygonsAndMarkers from './components/PolygonsAndMarkers';
import SearchBar from './components/SearchBar';
import BottomDrawerBuilding from './components/BottomDrawerBuilding';
import Building from './classes/building';
import { obtainBuildings } from './services/BuildingService';

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
  displayIndoor: boolean;
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      polygons: CampusPolygons.slice(0),
      buildings: obtainBuildings(),
      displayInfo: false,
      displayIndoor: false,
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

  callbackInOut = (status: boolean) => {
    this.setState({ displayIndoor: status });
  };

  /* Needed to pass callback to child (PolygonsAndMarkers.tsx) to update parent state (App.tsx) */
  displayBuildingInfo = (building: Building, displayInfo: boolean) => {
    this.setState({ displayInfo });
    this.setState({ building });
  };

  inOrOutView() {
    const { region, buildings, polygons, displayInfo, building, displayIndoor } = this.state;
    if (displayIndoor === false) {
      return (
        <View style={styles.container}>
          <SearchBar setMapLocation={this.setMapLocation} />
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
            indoorDisplay={this.callbackInOut}
          />
        </View>
      );
    }
    return (
      <View>
        <Text>
          indoor Component (should have a button somewhere that change the displayIndoor state to
          false when user is done whit indoor)
        </Text>
      </View>
    );
  }

  render() {
    return this.inOrOutView();
  }
}
export default App;
