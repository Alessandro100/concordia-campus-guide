class PointOfInterest {
  identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  getIdentifier() {
    return this.identifier;
  }

  setLongitude(newIdentifier: string) {
    this.identifier = newIdentifier;
  }
}
export default PointOfInterest;
