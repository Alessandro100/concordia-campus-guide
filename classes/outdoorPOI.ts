import Location from './location';
import PointOfInterest from './pointOfInterest';

class outdoorPOI extends PointOfInterest {
  location: Location;

  constructor(location: Location, identifier: String) {
    super(identifier);

    this.location = location;
  }

  getLocation() {
    return this.location;
  }

  setLocation(newLocation: Location) {
    this.location = newLocation;
  }
}
export default outdoorPOI;
