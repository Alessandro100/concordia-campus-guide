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
import IndoorFloor from './classes/indoorFloor';
import PolygonsAndMarkers from './components/PolygonsAndMarkers';

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

  setIndoorTile(arrayWidth, arrayHeight, imageHeight, initialHeight, path:[{x:number, y:number}], imageWidth) {
    let array = [];
    const widthPerTile = imageWidth / arrayWidth; // in px
    const heightPerTile = imageHeight / arrayHeight;

    for(let i = 0; i < arrayHeight; i++) {
      let yPosition = (i * heightPerTile) + initialHeight
      for(let z = 0; z < arrayWidth; z++){
        let xPosition = z * widthPerTile;
        array.push(
          <View key={i + " " + z} style={{zIndex: 5, position: 'absolute', top: yPosition, left: xPosition, borderRadius: 2, backgroundColor: 'red', width: widthPerTile, height: heightPerTile, opacity: 0.5}}>
          </View>
        )
      }
    }
    return array;
  }

  drawLines(imageHeight, path:[{x:number, y:number}], widthPerTile, heightPerTile, initialHeight, imageWidth) {
    let lines = []
    
    for(let pathIndex = 0; pathIndex < path.length - 1; pathIndex++) {
      const xPosition = path[pathIndex].x * widthPerTile;
      const yPosition = path[pathIndex].y * heightPerTile;

      const startingLocation = {
        xpx: path[pathIndex].x * widthPerTile + (0.5 * widthPerTile),  
        ypx: path[pathIndex].y * heightPerTile + (0.5 * heightPerTile) 
      }
      const endingLocation = {
        xpx: path[pathIndex + 1].x * widthPerTile + (0.5 * widthPerTile), 
        ypx: path[pathIndex + 1].y * heightPerTile + (0.5 * heightPerTile)
      }
      lines.push(
        <Svg height={imageHeight} width={imageWidth} style={{zIndex: 6, top: initialHeight, position: 'absolute'}} origin="0, 0" >
          <Line x1={startingLocation.xpx} y1={startingLocation.ypx} x2={endingLocation.xpx} y2={endingLocation.ypx}  stroke="blue" strokeWidth="2" />
        </Svg>
      )
    }
    return lines;
  }

  render() {
    const { region, markers, polygons } = this.state;

    const arrayWidth = 30;
    const arrayHeight = 30;
    const windowWidth = Dimensions.get('window').width;
    const windowHeigh = Dimensions.get('window').height;
    const imageRatio = 2823.0 / 2643.0;
    const imageHeight = windowWidth * imageRatio;

    //new image
    const imageRatio2 = 1704.0 / 4944.0;
    const imageHeight2 = windowWidth * imageRatio2;

    const widthPerTile = windowWidth / arrayWidth; // in px
    const heightPerTile = imageHeight / arrayHeight;
    const initialHeight = 100;

    //2643w × 2823h
    //4944 × 1704
    /*
      {x: 5, y:29}, 
      {x: 5, y:26}, 
    */

    const fakePath = [
      {x: 8, y:26},
      {x: 25, y:26},
      {x: 25, y:17},
      {x: 10, y:17},
      {x: 10, y:10},
    ]

    let floor = new IndoorFloor(require('./assets/indoor-floor-plans/Hall-1.png'), windowWidth, imageHeight, 1, 100, 0);
    let floor2 = new IndoorFloor(require('./assets/indoor-floor-plans/CC1.png'), windowWidth, imageHeight2, 1, 100, 0); 

    return (
      <View style={styles.container}>
        {/* <Image
          resizeMode={'cover'}
          style={{width: windowWidth, height: imageHeight, position: "absolute", top: initialHeight, left: 0, zIndex: 4}}
          source={require('./assets/indoor-floor-plans/Hall-1.png')}
        />
        {this.setIndoorTile(arrayWidth, arrayHeight, imageHeight, initialHeight, fakePath, windowWidth)}
        {this.drawLines(imageHeight, fakePath, widthPerTile, heightPerTile, initialHeight, windowWidth)} */}
        {floor.showFloorImage()}
        {floor.showIndoorTile()}
        
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
          <PolygonsAndMarkers markers={markers} polygons={polygons} />
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
