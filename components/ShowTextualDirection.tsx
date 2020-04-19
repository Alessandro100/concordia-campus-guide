import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import transportMode from '../classes/transportMode';
import Location from '../classes/location';
import Trip from '../classes/trip';
import PointOfInterest from '../classes/pointOfInterest';
import PathCalculator from '../classes/pathCalculator';
import styles from '../constants/DirectionInputStyling';

type directionProps = {
  startLocation: PointOfInterest;
  endLocation: PointOfInterest;
  transportType: transportMode;
};

type directionState = {
  isVisible: boolean;
  trip: Trip;
};

class ShowTextualDirection extends Component<directionProps, directionState> {
  constructor(props) {
    super(props);
    const { startLocation, endLocation, transportType } = this.props;
    const routeCalculator = new PathCalculator(startLocation, endLocation, transportType);
    this.state = {
      trip: new Trip(startLocation, endLocation, routeCalculator),
      isVisible: true,
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

  showTextDirection() {
    const { isVisible } = this.state;
    if (isVisible === false) {
      this.setState({ isVisible: true });
    }
  }

  hideTextDirection() {
    const { isVisible } = this.state;
    if (isVisible === true) {
      this.setState({ isVisible: false });
    }
  }

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
            <View style={styles.modal}>
              <View style={styles.row3}>
                <FlatList
                  data={trip.getRoute().getPathInstruction(false)}
                  renderItem={({ item }) => <Text>{item}</Text>}
                />
              </View>
            </View>
            {/* {trip.getRoute().getPathInstruction(false)} */}
          </>
        )}
      </>
    );
  }

  // render() {
  // const { trip } = this.state;

  // return (
  // <View style={styles.row3}>
  // <ScrollView>
  // <Text>Some Text</Text>
  // </ScrollView>
  // </View>
  // )
  // }
}

export default ShowTextualDirection;