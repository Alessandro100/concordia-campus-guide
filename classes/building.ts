import OutdoorPOI from './outdoorPOI';
import CampusEvent from './campusEvent';
import Campus from './campus';
import Location from './location';

class building extends OutdoorPOI {
  description: string;

  events: CampusEvent[];

  campus: Campus;

  constructor(
    description: string,
    events: CampusEvent[],
    campus: Campus,
    location: Location,
    identifier: String
  ) {
    super(location, identifier);
  }

  getDescription() {
    return this.description;
  }

  getEvents() {
    return this.events;
  }

  getCampus() {
    return this.campus;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setEvents(events: CampusEvent[]) {
    this.events = events;
  }

  setCampus(campus: Campus) {
    this.campus = campus;
  }

  setIdentifier(identifier: string) {
    this.identifier = identifier;
  }
}
export default building;
