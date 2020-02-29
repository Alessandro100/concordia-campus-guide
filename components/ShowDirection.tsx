import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import Polyline from '@mapbox/polyline';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import transportMode from '../classes/transportMode';

const styles = StyleSheet.create({
  imageSize: {
    width: 30,
    height: 30,
  },
});

type directionProps = {
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  transportType: transportMode;
};

class ShowDirection extends Component<directionProps, { steps: any[] }> {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
    };
    this.getDirectionsSteps = this.getDirectionsSteps.bind(this);
  }

  componentDidMount() {
    this.getDirectionsSteps();
  }

  // This function takes adresses as input and call the google API.
  // Time and distance are unused but left here for potential extra.
  async getDirectionsSteps() {
    const { startLat, startLon, endLat, endLon, transportType } = this.props;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLon}&destination=${endLat},${endLon}&mode=${transportType}&key=AIzaSyDpY_ACPWoo3mVPPmiLKQe1aBhjkDYlwJI`;
    const resp = await fetch(url);
    const respJson = await resp.json();
    // variables will be needed for future developement
    // const response = respJson.routes[0];
    // const distanceTime = response.legs[0];
    // const distance = distanceTime.distance.text;
    // const time = distanceTime.duration.text;
    this.setState({ steps: respJson.routes[0].legs[0].steps });
  }

  getPolylineColor = step => {
    if (step.travel_mode === 'TRANSIT') {
      return step.transit_details.line.color;
    }
    return Colors.mapsPolyline;
  };

  getPinLocation = step => {
    if (step) {
      return {
        latitude: step.end_location.lat,
        longitude: step.end_location.lng,
      };
    }
    return { latitude: 0, longitude: 0 };
  };

  decodePoints = rawPoints => {
    const points = Polyline.decode(rawPoints);
    const coords = points.map(point => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  };

  render() {
    const { steps } = this.state;
    const endingPinCoords = this.getPinLocation(steps[steps.length - 1]);
    const startingPinCoords = this.getPinLocation(steps[0]);

    return (
      <>
        <Marker
          coordinate={endingPinCoords}
          title="Ending Point"
          description="Ending point of the trip"
        />
        <Marker
          coordinate={startingPinCoords}
          title="Starting Point"
          description="Starting point of the trip"
          opacity={0.7}
        >
          <Image source={require('../assets/starting_icon.png')} style={styles.imageSize} />
        </Marker>

        {steps.map(step => (
          // @ts-ignore
          <MapView.Polyline
            key={`${step.end_location.lat}-${step.end_location.lng}`}
            strokeWidth={4}
            strokeColor={this.getPolylineColor(step)}
            coordinates={this.decodePoints(step.polyline.points)}
          />
        ))}
      </>
    );
  }
}

export default ShowDirection;
