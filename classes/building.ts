import OutdoorPOI from './outdoorPOI';
import CampusEvent from './CampusEvent';
import Campus from './campus';
import Location from './location';

class building extends OutdoorPOI {
  description: string;

  events: CampusEvent[];

  campus: Campus;

  name: string;

  location: Location;

  constructor(
    name: string,
    description: string,
    events: CampusEvent[],
    campus: Campus,
    location: Location,
    identifier: string
  ) {
    super(location, identifier);
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
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

  getLocation(): Location {
    return super.getLocation();
  }

  setLocation(newLocation: Location) {
    super.setLocation(newLocation);
  }

  getIdentifier(): String {
    return super.getIdentifier();
  }

  setIdentifier(identifier: string) {
    this.identifier = identifier;
  }
}
export default building;
