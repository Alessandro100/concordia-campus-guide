import PointOfInterest from './pointOfInterest';
import Coordinate from './coordinate';
import IndoorFloor from './indoorFloor';

class IndoorPOI extends PointOfInterest {
  coordinates: Coordinate;

  indoorFloor: IndoorFloor;

  type: string;

  constructor(
    identifier: string,
    coordinates: Coordinate,
    indoorFloor: IndoorFloor,
    type: string = ''
  ) {
    super(identifier);

    this.coordinates = coordinates;
    this.indoorFloor = indoorFloor;
    this.type = type;
  }
}
export default IndoorPOI;
