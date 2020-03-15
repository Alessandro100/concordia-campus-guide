import PointOfInterest from './pointOfInterest';

class campusEvent {
  title: String;

  description: String;

  startDateTime: Date;

  location: PointOfInterest;

  constructor(title: String, description: String, startDateTime: Date, location: PointOfInterest) {
    this.title = title;
    this.description = description;
    this.startDateTime = startDateTime;
    this.location = location;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getStartDateTime() {
    return this.startDateTime;
  }

  getLocation() {
    return this.location;
  }

  setTitle(title: String) {
    this.title = title;
  }

  setDescription(description: String) {
    this.description = description;
  }

  setStartDateTime(startTimeDate: Date) {
    this.startDateTime = startTimeDate;
  }

  setLocation(location: PointOfInterest) {
    this.location = location;
  }
}
export default campusEvent;
