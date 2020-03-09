import Location from './location';
import OutdoorPOI from './outdoorPOI';

class campus extends OutdoorPOI {
  description: String;

  constructor(description: String, location: Location, identifier: String) {
    super(location, identifier);
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: String) {
    this.description = description;
  }
}
export default campus;
