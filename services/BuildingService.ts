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
      new Location(marker.coordinate.latitude, marker.coordinate.longitude),
      marker.label
    );
    building.setName(marker.description);
    building.setDescription(marker.buildingDescription);
    buildingsSGW.push(building);
  });
  // setName() and setDescription() are needed otherwise the object is instanciated without those field. Weird behavior!
  markersLoyola.forEach(marker => {
    const building = new Building(
      marker.description,
      marker.buildingDescription,
      [],
      campusLoyola,
      new Location(marker.coordinate.latitude, marker.coordinate.longitude),
      marker.label
    );
    building.setName(marker.description);
    building.setDescription(marker.buildingDescription);
    buildingsLoyola.push(building);
  });
  return [...buildingsSGW, ...buildingsLoyola];
}

export function obtainCoordinateFromBuilding(building: Building): any {
  return {
    latitude: building.getLocation().getLatitude(),
    longitude: building.getLocation().getLongitude(),
  };
}
