import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TextStyle } from 'react-native';
import IndoorFloor from '../classes/indoorFloor';
import IndoorPOI from '../classes/indoorPOI';
import FastestPathCalculator from '../classes/fastestPathCalculator';
import transportMode from '../classes/transportMode';
import Trip from '../classes/trip';
import Colors from '../constants/Colors';
import IndoorFloorService from '../services/indoorFloorService';
import Coordinate from '../classes/coordinate';

const styles = StyleSheet.create({
  indoorMapHeader: {
    position: 'absolute',
    top: 0,
    padding: 20,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    alignItems: 'center',
    height: 100,
  },
  outDoorNavButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  navLogo: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    left: -20,
  },
  outDoorNavButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  headerTitle: {
    color: Colors.white,
    position: 'absolute',
    top: 50,
    fontSize: 18,
    fontWeight: 'bold',
  },
  indoorMapFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    height: 300,
  },
  floorNavigator: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
});

class IndoorFloorMap extends Component<
  { indoorFloor: IndoorFloor },
  { trip: Trip; availableFloors: IndoorFloor[]; currentIndoorFloor: IndoorFloor }
> {
  constructor(props) {
    super(props);
    const { indoorFloor } = this.props;

    const startLocation = new IndoorPOI('test-1', { x: 5, y: 27 }, indoorFloor, 'test-type-1');
    // const endLocation = new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end');
    const endLocation = new IndoorPOI('test-2', { x: 8, y: 26 }, indoorFloor, 'test-type-2');
    const routeCalculator = new FastestPathCalculator(
      startLocation,
      endLocation,
      transportMode.walking
    );

    this.state = {
      trip: new Trip(startLocation, endLocation, routeCalculator),
      availableFloors: IndoorFloorService.getAvailableIndoorFloorsForBuilding(
        indoorFloor.building.title
      ),
      currentIndoorFloor: indoorFloor,
    };

    this.loadRoute();
  }

  getFloorButtonStyle(floorNumber) {
    const { currentIndoorFloor } = this.state;

    return {
      backgroundColor:
        currentIndoorFloor.floorData.floorNumber === floorNumber
          ? Colors.primaryColor
          : Colors.polygonFill,
      width: 50,
      padding: 10,
    };
  }

  getButtonTextStyle(floorNumber): TextStyle {
    const { currentIndoorFloor } = this.state;

    return {
      textAlign: 'center',
      fontSize: 18,
      color: currentIndoorFloor.floorData.floorNumber === floorNumber ? Colors.white : Colors.black,
    };
  }

  goToOutdoorMap = () => {
    // nav back to outdoor map when implemented
  };

  async loadRoute() {
    const { trip } = this.state;

    trip.loadRoute().then(path => {
      trip.setRoute(path);
      this.setState({ trip });
    });
  }

  navigateFloor(floorNumber) {
    const { currentIndoorFloor } = this.state;
    const newFloor = IndoorFloorService.getFloor(currentIndoorFloor.building.title, floorNumber);
    this.setState({ currentIndoorFloor: newFloor });
  }

  render() {
    const { trip, availableFloors, currentIndoorFloor } = this.state;
    const a = new Coordinate(5, 28);
    const b = new Coordinate(7, 28);
    console.log(currentIndoorFloor.getPath(a,b));

    return (
      <>
        <View style={styles.indoorMapHeader}>
          <TouchableHighlight
            style={styles.outDoorNavButton}
            onPress={() => {
              this.goToOutdoorMap();
            }}
          >
            <>
              <Image style={styles.navLogo} source={require('../assets/back.png')} />
              <Text style={styles.outDoorNavButtonText}>Outdoor Map</Text>
            </>
          </TouchableHighlight>
          <Text style={styles.headerTitle}>{currentIndoorFloor.building.title}</Text>
        </View>
        {currentIndoorFloor.showFloorImage()}
        {currentIndoorFloor.showIndoorTile()}
        {trip.getRoute() != null && (
          <>
            {trip
              .getRoute()
              .displayPath(
                true,
                currentIndoorFloor.building.title,
                currentIndoorFloor.floorData.floorNumber
              )}
          </>
        )}
        <View style={styles.indoorMapFooter}>
          <View style={styles.floorNavigator}>
            {availableFloors.map(floor => (
              <TouchableHighlight
                key={floor.floorData.floorNumber}
                onPress={() => this.navigateFloor(floor.floorData.floorNumber)}
                style={this.getFloorButtonStyle(floor.floorData.floorNumber)}
              >
                <Text style={this.getButtonTextStyle(floor.floorData.floorNumber)}>
                  {floor.floorData.floorNumber}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      </>
    );
  }
}

export default IndoorFloorMap;
