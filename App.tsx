import React, { Component } from 'react';

import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
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
  positionBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    zIndex: 2,
    position: 'absolute',
    bottom: 140,
    right: 30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconSize: {
    height: 25,
    width: 25,
  },
});

type appState = {
  position: Location;
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
      position: new Location(0, 0),
      region: {
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

  updateLocation = (coordinate: Location) => {
    const { position } = this.state;
    position.setLatitude(coordinate.latitude);
    position.setLongitude(coordinate.longitude);
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


  success = (location: any) => {
    const { position } = this.state;
    position.setLatitude(location.coords.latitude);
    position.setLongitude(location.coords.longitude);
    this.setMapLocation(position);
  };

  failure = (err: any) => {
    console.log(err);
  };

  displayCurrentLocation() {
    const options = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    navigator.geolocation.getCurrentPosition(this.success, this.failure, options);
  }

  render() {
    const { region, markers, polygons } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.search} />
        <CampusToggleButton setMapLocation={this.setMapLocation} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={region}
          showsUserLocation
          showsMyLocationButton={false}
          onUserLocationChange={() => this.updateLocation}
          showsCompass={false}
        >
          <PolygonsAndMarkers markers={markers} polygons={polygons} />
          <ShowDirection
            startLocation={new OutdoorPOI(new Location(45.458488, -73.639862), 'test-start')}
            endLocation={new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end')}
            transportType={transportMode.transit}
          />
        </MapView>
        <View style={styles.positionBtn}>
          <TouchableOpacity onPress={() => this.displayCurrentLocation()}>
            <Image style={styles.iconSize} source={require('./assets/cp.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return this.inOrOutView();
  }
}
export default App;
