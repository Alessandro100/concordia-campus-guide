import Location from './location';
import outdoorPOI from './outdoorPOI';

class Campus extends outdoorPOI {
  description: String;

  constructor(location: Location, identifier: String, description: String) {
    super(location, identifier);

    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription: String) {
    this.description = newDescription;
  }
}
export default Campus;
