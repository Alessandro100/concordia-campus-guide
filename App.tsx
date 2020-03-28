import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import CampusPolygons from './constants/CampusPolygons';
import CampusMarkers from './constants/CampusMarkers';
import OutCampusInterestMarkers from './constants/OutCampusInterestMarkers';
import Colors from './constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    width: Dimensions.get('window').width - 50,
    height: 50,
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 2,
    top: 50,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: Colors.mapMarkerColor,
  },
  pinText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
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
  outCampusMarkers: any[];
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
      markers: CampusMarkers.slice(0),
      outCampusMarkers: OutCampusInterestMarkers.slice(0),
    };
  }

  setMapLocation = (latitude, longitude) => {
    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
    });
  };

  render() {
    const { region, polygons, markers,outCampusMarkers } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.search} />
        <CampusToggleButton setMapLocation={this.setMapLocation} />
        <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} region={region}>
          {polygons.map(polygon => (
            <View key={`${String(polygon.latitude)}-${String(polygon.longitude)}`}>
              <Polygon
                coordinates={polygon}
                strokeColor={Colors.polygonStroke}
                strokeWidth={1}
                fillColor={Colors.polygonFill}
              />
            </View>
          ))}
          {markers.map(marker => (
            <Marker
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              pinColor={marker.pinColor}
            >
              <View style={styles.circle}>
                <Text style={styles.pinText}>{marker.label}</Text>
              </View>
            </Marker>
          ))}
          {outCampusMarkers.map(outCampusmarker => (
            <Marker
              coordinate={outCampusmarker.coordinate}
            >
              <Icon 
              name={outCampusmarker.icon}
              size={40}
              color={outCampusmarker.pinColor}/>
              <Callout>
                <View style={{width:100}}>
                  <Text>{outCampusmarker.type}</Text>
                  <Text>{outCampusmarker.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
          <ShowDirection
            startLat={45.458488}
            startLon={-73.639862}
            endLat={45.50349}
            endLon={-73.572182}
            transportType={transportMode.transit}
          />
        </MapView>
      </View>
    );
  }
}

export default App;
