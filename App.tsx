import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';

class App extends Component {

  state = {
    region: {
      // this is the SGW campus location
      latitude: 45.497406,
      longitude: -73.577102,

      latitudeDelta: 0,
      longitudeDelta: 0.01,
    }
  };

  setMapLocation = (latitude, longitude) => {
    this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      }
    })
  }

  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.directionLine}>
         
        </View>
        <View style={styles.search}></View>
       <CampusToggleButton setMapLocation={this.setMapLocation} />
       
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={region}       
        >
          <ShowDirection 
            startLat={45.458488} 
            startLon={-73.639862} 
            endLat={45.503490} 
            endLon={-73.572182}
            transportType={transportMode.transit}
          ></ShowDirection>
        </MapView>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    width: Dimensions.get('window').width - 50,
    height: 50,
    backgroundColor: 'white',
    position: "absolute",
    zIndex: 2,
    top: 50,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  campusToggle: {
    display: "flex",
    flexDirection: 'row',
    position: "absolute",
    top: 110,
    zIndex: 2,
    borderRadius: 10,
    overflow: "hidden"
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  directionLine:{
    position: "absolute"
 },
});

export default App;
