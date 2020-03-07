class PointOfInterest {
  identifier: String;

  constructor(identifier: String) {
    this.identifier = identifier;
  }

  getIdentifier() {
    return this.identifier;
  }

  setLongitude(newIdentifier: String) {
    this.identifier = newIdentifier;
  }
}
export default PointOfInterest;
