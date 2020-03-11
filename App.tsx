import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import Location from './classes/location';
import CampusPolygons from './constants/CampusPolygons';
import CampusMarkers from './constants/CampusMarkers';
import Colors from './constants/Colors';
import OutdoorPOI from './classes/outdoorPOI';
import { Svg, Line } from 'react-native-svg';

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

  setIndoorTile(arrayWidth, arrayHeight, imageHeight, initialHeight, path:[{x:number, y:number}]) {
    let array = [];
    const windowWidth = Dimensions.get('window').width;
    const widthPerTile = windowWidth / arrayWidth; // in px
    const heightPerTile = imageHeight / arrayHeight;

    let pathIndex = 0;

    for(let i = 0; i < arrayHeight; i++) {
      let row = [];
      let yPosition = (i * heightPerTile) + initialHeight
      for(let z = 0; z < arrayWidth; z++){
        let xPosition = z * widthPerTile;
        row.push(
          <View style={{zIndex: 5, position: 'absolute', top: yPosition, left: xPosition, borderRadius: 2, backgroundColor: 'red', width: widthPerTile, height: heightPerTile, opacity: 0.5}}>
          </View>
        )
        if (path[pathIndex].x == z && path[pathIndex].y == i && path[pathIndex + 1]) {
          const startingLocation = {
            xpx: xPosition + (0.5 * widthPerTile),  
            ypx: yPosition + (0.5 * heightPerTile) - initialHeight
          }
          const endingLocation = {
            xpx: path[pathIndex + 1].x * widthPerTile + (0.5 * widthPerTile), 
            ypx: path[pathIndex + 1].y * heightPerTile + (0.5 * heightPerTile)
          }
          row.push(
            <Svg height="300px" width="100%" style={{zIndex: 6, top: initialHeight, position: 'absolute'}} origin="0, 0" >
              <Line x1={startingLocation.xpx} y1={startingLocation.ypx} x2={endingLocation.xpx} y2={endingLocation.ypx}  stroke="blue" strokeWidth="2" />
            </Svg>
          )
          pathIndex = pathIndex + 1;
        }
      }
      
      array.push(row);
    }
    return array;
  }

  render() {
    const { region, polygons, markers } = this.state;

    const arrayWidth = 30;
    const arrayHeight = 30;
    const windowWidth = Dimensions.get('window').width;
    const windowHeigh = Dimensions.get('window').height;
    const imageHeight = 300;

    const widthPerTile = windowWidth / arrayWidth; // in px
    const heightPerTile = imageHeight / arrayHeight;
    const initialHeight = 100;

    const fakePath = [
      {x: 3, y:3}, 
      {x: 3, y:5}, 
      {x: 5, y:5},
      {x: 5, y:10},
      {x: 15, y:10},
    ]

    return (
      <View style={styles.container}>
        <Image
          style={{width: '100%', height: imageHeight, position: "absolute", top: initialHeight, left: 0, zIndex: 4}}
          source={require('./assets/indoor-floor-plans/Hall-1.png')}
        />
        {this.setIndoorTile(arrayWidth, arrayHeight, imageHeight, initialHeight, fakePath)}
        
        {/* <SvgUri
          width="200"
          height="200"
          source={{
            uri: './assets/indoor-floor-plans/Hall-1.png',
          }}
        /> */}
        {/* <View style={styles.search} />
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
              key={marker.title}
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
            startLocation={new OutdoorPOI(new Location(45.458488, -73.639862), 'test-start')}
            endLocation={new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end')}
            transportType={transportMode.transit}
          />
        </MapView> */}
      </View>
    );
  }
}

export default App;
