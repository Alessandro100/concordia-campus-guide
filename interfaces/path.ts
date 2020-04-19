import Location from '../classes/location';
import Coordinate from '../classes/coordinate';

interface Path {
  displayPath(isIndoor: boolean, buildingName?: string, floorNumber?: string): void;
  getPathInstruction(isIndoor: boolean, buildingName?: string, floorNumber?: string): any;
  getStartingLocation(): Location | Coordinate;
  getEndingLocation(): Location | Coordinate;
}

export default Path;
