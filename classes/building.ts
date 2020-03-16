import OutdoorPOI from './outdoorPOI';
import CampusEvent from './campusEvent';
import Campus from './campus';
import Location from './location';
import IndoorFloor from './indoorFloor';

class Building extends OutdoorPOI {
  description: String;

  events: CampusEvent[];

  campus: Campus;

  indoorFloors: IndoorFloor[];

  constructor(
    description: string,
    events: CampusEvent[],
    campus: Campus,
    location: Location,
    identifier: string
  ) {
    super(location, identifier);

    this.indoorFloors = [];
  }

  addFloor(floor: IndoorFloor) {
    this.indoorFloors.push(floor);
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
}
export default Building;
