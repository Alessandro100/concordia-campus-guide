import PointOfInterest from './pointOfInterest';
import RouteCalculator from '../interfaces/routeCalculator';
import Path from '../interfaces/path';

class Trip {
  origin: PointOfInterest;

  destination: PointOfInterest;

  route: Path;

  routeCalculator: RouteCalculator;

  constructor(
    origin: PointOfInterest,
    destination: PointOfInterest,
    routeCalculator: RouteCalculator
  ) {
    this.origin = origin;
    this.destination = destination;
    this.routeCalculator = routeCalculator;
  }

  setOrigin(newOrigin: PointOfInterest) {
    this.origin = newOrigin;
  }

  setDestination(newDestination: PointOfInterest) {
    this.destination = newDestination;
  }

  setRoute(newRoute: Path) {
    this.route = newRoute;
  }

  getOrigin() {
    return this.origin;
  }

  getDestination() {
    return this.destination;
  }

  getRoute() {
    return this.route;
  }

  loadRoute() {
    return new Promise<Path>((resolve, reject) => {
      this.routeCalculator.calculatePath().then(
        path => {
          this.route = path;
          resolve(path);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

export default Trip;
