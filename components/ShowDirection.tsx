import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import transportMode from '../classes/transportMode';
import Location from '../classes/location';
import Trip from '../classes/trip';
import PointOfInterest from '../classes/pointOfInterest';
import FastestPathCalculator from '../classes/fastestPathCalculator';

const styles = StyleSheet.create({
  imageSize: {
    width: 30,
    height: 30,
  },
});

type directionProps = {
  startLocation: PointOfInterest;
  endLocation: PointOfInterest;
  transportType: transportMode;
};

type directionState = {
  trip: Trip;
};

class ShowDirection extends Component<directionProps, directionState> {
  constructor(props) {
    super(props);
    const { startLocation, endLocation, transportType } = this.props;
    const routeCalculator = new FastestPathCalculator(startLocation, endLocation, transportType);
    this.state = {
      trip: new Trip(startLocation, endLocation, routeCalculator),
    };

    this.loadRoute();
  }

  getPinLocation = (location: Location) => {
    if (location) {
      return {
        latitude: location.getLatitude(),
        longitude: location.getLongitude(),
      };
    }
    return { latitude: 0, longitude: 0 };
  };

  async loadRoute() {
    const { trip } = this.state;

    trip.loadRoute().then(path => {
      trip.setRoute(path);
      this.setState({ trip });
    });
  }

  render() {
    const { trip } = this.state;

    return (
      <>
        {trip.getRoute() != null && (
          <>
            {/* Get ending location is an issue as this takes the location of the entire trip. The beginning and 
            ending might be indoors with and outdoor component in the middle. This currently does not support that */}
            {/* <Marker
              coordinate={this.getPinLocation(trip.getRoute().getEndingLocation())}
              title="Ending Point"
              description="Ending point of the trip"
            />
            <Marker
              coordinate={this.getPinLocation(trip.getRoute().getStartingLocation())}
              title="Starting Point"
              description="Starting point of the trip"
              opacity={0.7}
            >
              <Image source={require('../assets/starting_icon.png')} style={styles.imageSize} />
            </Marker> */}
            {trip.getRoute().displayPath(false)}
          </>
        )}
      </>
    );
  }
}

export default ShowDirection;
