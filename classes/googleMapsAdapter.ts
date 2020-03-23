import Polyline from '@mapbox/polyline';
import { REACT_APP_GOOGLE_DIRECTIONS_API_KEY } from 'react-native-dotenv';
import transportMode from './transportMode';
import Location from './location';
import UnitPath from './unitPath';
import OutdoorPOI from './outdoorPOI';
import CompoundPath from './compoundPath';
import Colors from '../constants/Colors';
import Path from '../interfaces/path';

class GoogleMapsAdapter {
  baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';

  apiKey = REACT_APP_GOOGLE_DIRECTIONS_API_KEY;

  // this function should return an object of type path
  // This function takes adresses as input and call the google API.
  // Time and distance are unused but left here for potential extra.
  getDirectionsSteps(startLocation: Location, endLocation: Location, transportType: transportMode) {
    return new Promise<Path>((resolve, reject) => {
      const startLocationString = `${startLocation.getLatitude()},${startLocation.getLongitude()}`;
      const endLocationString = `${endLocation.getLatitude()},${endLocation.getLongitude()}`;
      const url = `${this.baseUrl}?origin=${startLocationString}&destination=${endLocationString}&mode=${transportType}&key=${this.apiKey}`;

      fetch(url).then(
        resp => {
          resp.json().then(
            respJson => {
              const formattedSteps = this.formatSteps(respJson.routes[0].legs[0].steps);
              resolve(formattedSteps);
            },
            err => {
              reject(err);
            }
          );
        },
        err => {
          reject(err);
        }
      );
    });
  }

  decodePoints = rawPoints => {
    const points = Polyline.decode(rawPoints);
    return points.map(point => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
  };

  getPolylineColor = step => {
    if (step.travel_mode === 'TRANSIT') {
      return step.transit_details.line.color;
    }
    return Colors.mapsPolyline;
  };

  formatSteps(steps: any[]) {
    const formattedSteps = new CompoundPath();
    steps.forEach(step => {
      const formattedStep = new UnitPath(
        step.travel_mode,
        new OutdoorPOI(
          new Location(step.start_location.lat, step.start_location.lng),
          'test-start'
        ),
        new OutdoorPOI(new Location(step.end_location.lat, step.end_location.lng), 'test-end'),
        this.decodePoints(step.polyline.points),
        this.getPolylineColor(step)
      );
      formattedSteps.addUnitPath(formattedStep);
    });
    return formattedSteps;
  }
}
export default GoogleMapsAdapter;
