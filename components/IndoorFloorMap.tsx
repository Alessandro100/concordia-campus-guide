import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TextStyle } from 'react-native';
import IndoorFloor from '../classes/indoorFloor';
import IndoorPOI from '../classes/indoorPOI';
import PathCalculator from '../classes/pathCalculator';
import transportMode from '../classes/transportMode';
import Trip from '../classes/trip';
import Colors from '../constants/Colors';
import IndoorFloorService from '../services/indoorFloorService';
import IndoorPOIService from '../services/indoorPOIService';
import OutdoorPOI from '../classes/outdoorPOI';
import Location from '../classes/location';
import PointOfInterest from '../classes/pointOfInterest';

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
    height: 100,
  },
  floorNavigatorText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 16,
  },
  floorNavigator: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
});

class IndoorFloorMap extends Component<
  { indoorFloor: IndoorFloor, indoorDisplay, startLocation: PointOfInterest, endLocation: PointOfInterest },
  { trip: Trip; availableFloors: IndoorFloor[]; currentIndoorFloor: IndoorFloor }
> {
  constructor(props) {
    super(props);
    const { indoorFloor, startLocation, endLocation } = this.props;

    let routeCalculator = null;

    if (startLocation && endLocation) {
      routeCalculator = new PathCalculator(
        startLocation,
        endLocation,
        transportMode.walking
      );
    }
 
    this.state = {
      trip: (routeCalculator) ? new Trip(startLocation, endLocation, routeCalculator) : null,
      availableFloors: IndoorFloorService.getAvailableIndoorFloorsForBuilding(
        indoorFloor.building.title
      ),
      currentIndoorFloor: indoorFloor,
    };

    this.loadRoute();
  }

  changeToOutdoorView = () => {
    const { indoorDisplay } = this.props;
    indoorDisplay(false);
  };

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

  async loadRoute() {
    const { trip } = this.state;

    // trip.setOrigin(origin);
    // trip.setDestination(destination);

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

    return (
      <>
        <View style={styles.indoorMapHeader}>
          <TouchableHighlight
            style={styles.outDoorNavButton}
            onPress={() => {
              this.changeToOutdoorView();
            }}
          >
            <>
              <Image style={styles.navLogo} source={require('../assets/back-white.png')} />
              <Text style={styles.outDoorNavButtonText}>Outdoor Map</Text>
            </>
          </TouchableHighlight>
          <Text style={styles.headerTitle}>{currentIndoorFloor.building.title}</Text>
        </View>
        {currentIndoorFloor.showFloorImage()}
        {currentIndoorFloor.showIndoorTile()}
        {trip && trip.getRoute() != null && (
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
          <Text style={styles.floorNavigatorText}>Floor Navigation</Text>
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
