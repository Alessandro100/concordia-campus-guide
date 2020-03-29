import Location from './location';
import PointOfInterest from './pointOfInterest';

class OutdoorPOI extends PointOfInterest {
  location: Location;

  constructor(location: Location, identifier: string) {
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
export default OutdoorPOI;
