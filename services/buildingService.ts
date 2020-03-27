import Building from '../classes/building';
import { MarkersLoyola, MarkersSGW } from '../constants/CampusMarkers';
import Location from '../classes/location';
import CampusLocations from '../constants/CampusLocations';

export function obtainBuildings(): Building[] {
  const markersSGW = MarkersSGW.slice(0);
  const markersLoyola = MarkersLoyola.slice(0);

  const campusSGW = CampusLocations.SGW;
  const campusLoyola = CampusLocations.Loyola;

  const buildingsSGW = [];
  const buildingsLoyola = [];

  // setName() and setDescription() are needed otherwise the object is instanciated without those field. Weird behavior!
  markersSGW.forEach(marker => {
    const building = new Building(
      marker.description,
      marker.buildingDescription,
      [],
      campusSGW,
      marker.title,
      new Location(marker.coordinate.latitude, marker.coordinate.longitude),
      marker.label
    );
    building.setName(marker.description);
    building.setTitle(marker.title);
    building.setDescription(marker.buildingDescription);
    building.setIdentifier(marker.label);
    buildingsSGW.push(building);
  });
  // setName() and setDescription() are needed otherwise the object is instanciated without those field. Weird behavior!
  markersLoyola.forEach(marker => {
    const building = new Building(
      marker.description,
      marker.buildingDescription,
      [],
      campusLoyola,
      marker.title,
      new Location(marker.coordinate.latitude, marker.coordinate.longitude),
      marker.label
    );
    building.setName(marker.description);
    building.setTitle(marker.title);
    building.setDescription(marker.buildingDescription);
    building.setIdentifier(marker.label);
    buildingsLoyola.push(building);
  });
  return [...buildingsSGW, ...buildingsLoyola];
}

export function obtainCoordinateFromBuilding(building: Building): Location {
  return new Location(building.getLocation().getLatitude(), building.getLocation().getLongitude());
}

export function parseLocationToLatLngType(location: Location) {
  return {
    latitude: location.getLatitude(),
    longitude: location.getLongitude(),
  };
}
