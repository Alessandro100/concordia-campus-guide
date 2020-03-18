import transportMode from '../classes/transportMode';
import PointOfInterest from '../classes/pointOfInterest';
import Path from './path';

interface UnitPath extends Path {
  transportType: transportMode;
  origin: PointOfInterest;
  destination: PointOfInterest;
  pathColor: String;
}

export default UnitPath;
