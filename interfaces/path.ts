import Location from '../classes/location';

interface Path {
  displayPath(): void;
  getStartingLocation(): Location;
  getEndingLocation(): Location;
}

export default Path;
