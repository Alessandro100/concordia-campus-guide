import OutdoorPOI from './outdoorPOI';
import CampusEvent from './CampusEvent';
import Campus from './campus';
import Location from './location';
import IndoorFloor from './indoorFloor';

class Building extends OutdoorPOI {
  name: string;
  title: string;
  description: string;
  events: CampusEvent[];
  campus: Campus;
  indoorFloors: IndoorFloor[];

  constructor(
    name: string,
    description: string,
    events: CampusEvent[],
    campus: Campus,
    title: string,
    location: Location,
    identifier: string
  ) {
    super(location, identifier);

    this.indoorFloors = [];
  }

  addFloor(floor: IndoorFloor) {
    this.indoorFloors.push(floor);
  }

  setTitle(title: string) {
    this.title = title;
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

  getIdentifier(): string {
    return super.getIdentifier();
  }

  setIdentifier(identifier: string) {
    this.identifier = identifier;
  }
}
export default Building;
