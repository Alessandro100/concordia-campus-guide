import Campus from '../classes/campus';
import Location from '../classes/location';

export default {
  Loyola: new Campus(
    new Location(45.4582, -73.6405),
    'Loyola',
    'This is the description for the Loyola Campus'
  ),
  SGW: new Campus(
    new Location(45.497406, -73.577102),
    'SGW',
    'This is the description for the SGW campus'
  ),
};
