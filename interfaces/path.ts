import Location from '../classes/location';
import Coordinate from '../classes/coordinate';

interface Path {
  displayPath(isIndoor: boolean, buildingName?: string, floorNumber?: string): void;
  getStartingLocation(): Location | Coordinate;
  getEndingLocation(): Location | Coordinate;
}

export default Path;
