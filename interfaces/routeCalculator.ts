import GoogleMapsAdapter from '../classes/googleMapsAdapter';
import transportMode from '../classes/transportMode';
import PointOfInterest from '../classes/pointOfInterest';
import Path from './path';

interface RouteCalculator {
  externalRouterAdapter: GoogleMapsAdapter;
  transportType: transportMode;
  startingPOI: PointOfInterest;
  endingPOI: PointOfInterest;
  calculatePath(): Promise<Path>;
}

export default RouteCalculator;
