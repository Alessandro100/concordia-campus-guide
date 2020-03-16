
import PointOfInterest from './pointOfInterest';
import Coordinate from './Coordinate';
import IndoorFloor from './indoorFloor';

class IndoorPOI extends PointOfInterest {
  coordinates: Coordinate;
  indoorFloor: IndoorFloor;
  type: string; //make it as an enum maybe?

  constructor(identifier: string, coordinates: Coordinate, type: string = '') {
    super(identifier);

    this.coordinates = coordinates;
    this.type = type;
  }

}
export default IndoorPOI;
