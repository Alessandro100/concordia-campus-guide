import React from 'react';
import MapView from 'react-native-maps';
import transportMode from './transportMode';
import Location from './location';
import UnitPath from '../interfaces/unitPath';
import OutdoorPOI from './outdoorPOI';

class OutdoorUnitPath implements UnitPath {
  transportType: transportMode;

  origin: OutdoorPOI;

  destination: OutdoorPOI;

  pathGraphic: Location;

  pathColor: String;

  constructor(
    transportType: transportMode,
    origin: OutdoorPOI,
    destination: OutdoorPOI,
    pathGraphic: Location,
    pathColor: String
  ) {
    this.transportType = transportType;
    this.origin = origin;
    this.destination = destination;
    this.pathGraphic = pathGraphic; // exclusive to outdoor
    this.pathColor = pathColor;
  }

  displayPath(isIndoor) {
    if (!isIndoor) {
      return (
        // @ts-ignore
        <MapView.Polyline
          strokeWidth={4}
          strokeColor={this.pathColor}
          coordinates={this.pathGraphic}
        />
      );
    }

    // returns empty html
    return <></>;
  }

  getStartingLocation() {
    return this.origin.getLocation();
  }

  getEndingLocation() {
    return this.destination.getLocation();
  }

  getTransportMode() {
    return this.transportType;
  }

  getpathGraphic() {
    return this.pathGraphic;
  }

  getpathColor() {
    return this.pathColor;
  }
}

export default OutdoorUnitPath;
