import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import CampusPolygons from './constants/CampusPolygons';
import CampusMarkers from './constants/CampusMarkers';
import Colors from './constants/Colors';
import InputBtn from './components/InputBtn';


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
  ready: Boolean;
  coordinate: LatLng;
  error: String;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  polygons: any[];
  markers: any[];
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    this.state = {
      ready: true,
      coordinate: {latitude:null, longitude:null},
      error: null,
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      polygons: CampusPolygons.slice(0),
      markers: CampusMarkers.slice(0),
      
    };
  }
  componentDidMount(){
    let options = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    };
    this.setState({ready:false, error: null });
    navigator.geolocation.getCurrentPosition( 
        this.success,this.failure,options);}
    
        success = (position) => {
            this.setState({
                ready:true,
                coordinate: {latitude: position.coords.latitude,longitude:position.coords.longitude }
            })
        }
        failure = (err) => {
            this.setState({error: err.message});
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
    const { region, polygons, markers } = this.state;
    const { coordinate }= this.state;
    return (
      <View style={styles.container}>
        <View style={styles.search} />
        <CampusToggleButton setMapLocation={this.setMapLocation} />
        <InputBtn></InputBtn>
        <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} region={region}>
          {this.state.ready && (
          <Marker coordinate={coordinate}
              title='Position'
              description='Current Position'
              pinColor='rgb(163, 9, 9)'/>)}
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
