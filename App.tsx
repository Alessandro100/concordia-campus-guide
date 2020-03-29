import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import Location from './classes/location';
import CampusPolygons from './constants/CampusPolygons';
import Colors from './constants/Colors';
import OutdoorPOI from './classes/outdoorPOI';
import PolygonsAndMarkers from './components/PolygonsAndMarkers';
import BottomDrawerBuilding from './components/BottomDrawerBuilding';
import Building from './classes/building';
import { obtainBuildings } from './services/BuildingService';
import CurrentPosition from './components/CurrentPosition';
import InputBtn from './components/InputBtn';
import Autocomplete from './components/AutoCompleteInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    width: Dimensions.get('window').width - 50,
    flex:1,
    height: 40,
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 4,
    top: 50,
    borderColor: Colors.black,
    left:-155,
    borderWidth: 0.5,
    padding: 10,
  },

  searchSugg:{
    width: Dimensions.get('window').width - 50,
    position:"relative",
    left:25,
    top:62,
    zIndex:10,
    height: 45,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 5,
  },
  searchInput:{
    width: Dimensions.get('window').width - 50,
    position:"absolute",
    left:25,
    top:26,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

type appState = {
  userPosition:Location;
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
      userPosition: new Location (45.497406,-73.577102),
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

  changeCurrentPosition  = (coordinate: any) => {
    const { userPosition } = this.state;
    userPosition.setLatitude(coordinate.latitude);
    userPosition.setLongitude(coordinate.longitude);
  };
    
  inOrOutView() {
  
    const { region, buildings, polygons, displayInfo, building, displayIndoor, userPosition } = this.state;

    if (displayIndoor === false) {
      return (
        <View style={styles.container}>
          {/* <SearchBar setMapLocation={this.setMapLocation} /> */}
          <Autocomplete btnStyle ={styles.search} styleSugg={styles.searchSugg} styleInput={styles.searchInput} type="Search" lat={userPosition.getLatitude()} lng={userPosition.getLongitude()}/>
          <CampusToggleButton setMapLocation={this.setMapLocation} />
          <InputBtn lat={userPosition.getLatitude()} lng={userPosition.getLongitude()}/>
          
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={(coordinates)=>this.changeCurrentPosition(coordinates)}
            
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
    return (
     <Text>indoor component </Text>
    
    );
  }

  render() {
    return this.inOrOutView();
  }
}
export default App;
