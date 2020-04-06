import Location from '../classes/location';

export function locationToGooglePlaceString(location: Location): string {
  return `${String(location.getLatitude())}, ${String(location.getLongitude())}`;
}

export default locationToGooglePlaceString;
