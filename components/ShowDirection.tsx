import React, { Component, Fragment } from 'react';
import Polyline from '@mapbox/polyline';
import MapView from 'react-native-maps';
import Colors from '../constants/Colors';

enum transportMode {
  driving = 'driving',
  walking = 'walking',
  bicycle = 'bicycle',
  transit = 'transit'
}

class ShowDirection extends Component {
  state = {
    coords: [],
    steps: [],
    // Hard coded adresses to display path.
    startLocation: '7141 Rue Sherbrooke Ouest, Montréal, QC H4B 1R6',
    destination: '1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8'
  };

  constructor(props) {
    super(props);

    this.getDirections = this.getDirections.bind(this);
  }

  decodePoints(rawPoints) {
    const points = Polyline.decode(rawPoints);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  }

  // This function takes adresses as input and call the google API.
  // Time and distance are unused but left here for potential extra.
  async getDirections(startLoc, desLoc) {
    try {
      const transportType: transportMode = transportMode.transit;
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=${transportType}&key=AIzaSyDpY_ACPWoo3mVPPmiLKQe1aBhjkDYlwJI`
      );
      const respJson = await resp.json();
      const response = respJson.routes[0];
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const time = distanceTime.duration.text;

      this.setState({ steps: respJson.routes[0].legs[0].steps });
    } catch (error) {}
  }

  componentDidMount() {
    this.getDirections(this.state.startLocation, this.state.destination);
  }

  getPolylineColor(step) {
 
    if (step.travel_mode === 'TRANSIT') {
      return step.transit_details.line.color;
    } else {
      return Colors.mapsPolyline;
    }
  }

  render() {
    const { steps } = this.state;
    
    return (
      <Fragment>
        {steps.map(step => (
          <MapView.Polyline
            strokeWidth={4}
            strokeColor={this.getPolylineColor(step)}
            coordinates={this.decodePoints(step.polyline.points)}
          />
        ))}
      </Fragment>
    );
  }
}

export default ShowDirection;
