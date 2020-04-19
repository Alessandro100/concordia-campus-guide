import React, { Component } from 'react';
import transportMode from '../classes/transportMode';
import Location from '../classes/location';
import Trip from '../classes/trip';
import PointOfInterest from '../classes/pointOfInterest';
import PathCalculator from '../classes/pathCalculator';

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
    
    this.setTrip();
    this.loadRoute();
  }

  setTrip() {
    const { startLocation, endLocation, transportType } = this.props;
    const routeCalculator = new PathCalculator(startLocation, endLocation, transportType);
    this.state = {
      trip: new Trip(startLocation, endLocation, routeCalculator),
    };

  }

  // update the point of interest when the props changes
  componentDidUpdate(prevProps) {
    const { startLocation, endLocation, transportType } = this.props;
    if (prevProps.startLocation !== startLocation || prevProps.endLocation !== endLocation || prevProps.transportType !== transportType) {
      this.setTrip();
      this.loadRoute();
    }
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
            {trip.getRoute().displayPath(false)}
          </>
        )}
      </>
    );
  }
}

export default ShowDirection;
