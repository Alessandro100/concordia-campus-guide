class Location {
  latitude: number;

  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getLatitude() {
    return this.latitude;
  }

  setLongitude(newLongitude: number) {
    this.longitude = newLongitude;
  }

  setLatitude(newLatitude: number) {
    this.latitude = newLatitude;
  }
}
export default Location;
