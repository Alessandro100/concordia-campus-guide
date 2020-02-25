import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import { buildingPolygons } from "./constants/CampusPolygons";

class App extends Component {
  constructor() {
    // @ts-ignore
      super();

    this.state = {
        region: {
            // this is the SGW campus location
            latitude: 45.497406,
            longitude: -73.577102,
            latitudeDelta: 0,
            longitudeDelta: 0.01,
        },
    };
  }


  setMapLocation = (latitude, longitude) => {
    this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      }
    })
  };

  getLocalPosition = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);

          this.setState({ location });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    // @ts-ignore
      const { region } = this.state;

    return (
        <View style={styles.container}>
          <View style={styles.search}/>
          <CampusToggleButton setMapLocation={this.setMapLocation}/>
          <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} region={region}>
              {buildingPolygons.map((polygon, index) => (
                  <View key={index}>
                      <Polygon
                          coordinates={polygon}
                          strokeColor='rgb(163, 9, 9)'
                          strokeWidth={1}
                          fillColor = 'rgba(163, 9, 9, 0.1)'
                      />
                  </View>
              ))}
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
});

export default App;
