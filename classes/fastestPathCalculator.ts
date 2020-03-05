import RouteCalculator from '../interfaces/routeCalculator';
import Path from '../interfaces/path';
import GoogleMapsAdapter from './googleMapsAdapter';
import OutdoorPOI from './outdoorPOI';
import transportMode from './transportMode';
import PointOfInterest from './pointOfInterest';

class FastestPathCalculator implements RouteCalculator {
  externalRouterAdapter: GoogleMapsAdapter;

  transportType: transportMode;

  startingPOI: PointOfInterest;

  endingPOI: PointOfInterest;

  constructor(
    startingPOI: PointOfInterest,
    endingPOI: PointOfInterest,
    transportType: transportMode
  ) {
    this.externalRouterAdapter = new GoogleMapsAdapter();
    this.startingPOI = startingPOI;
    this.endingPOI = endingPOI;
    this.transportType = transportType;
  }

  // NOTE: for now we will only deal with external paths
  calculatePath() {
    return new Promise<Path>((resolve, reject) => {
      if (this.startingPOI instanceof OutdoorPOI && this.endingPOI instanceof OutdoorPOI) {
        this.getOutdoorPath(this.startingPOI, this.endingPOI).then(
          outdoorPaths => {
            resolve(outdoorPaths);
          },
          err => {
            reject(err);
          }
        );
      } else {
        // TODO: Handle indoor points of interest
        reject(new Error('Indoor Routes not handled yet'));
      }
    });
  }

  // TODO: will need to specify: best route, wheel chair accessible, or less walking
  // NOTE: passing these parameters into google api does all the work for us
  // NOTE: this function returns a compound path
  getOutdoorPath(startLocation: OutdoorPOI, endLocation: OutdoorPOI) {
    return new Promise<Path>((resolve, reject) => {
      this.externalRouterAdapter
        .getDirectionsSteps(
          startLocation.getLocation(),
          endLocation.getLocation(),
          this.transportType
        )
        .then(
          paths => {
            resolve(paths);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}

export default FastestPathCalculator;
