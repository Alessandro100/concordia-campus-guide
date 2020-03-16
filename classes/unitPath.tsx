import React from 'react';
import MapView from 'react-native-maps';
import transportMode from './transportMode';
import PointOfInterest from './pointOfInterest';
import Location from './location';
import Path from '../interfaces/path';
import outdoorPOI from './outdoorPOI';

class UnitPath implements Path {
  transportType: transportMode;

  origin: PointOfInterest;

  destination: PointOfInterest;

  pathGraphic: Location;

  pathColor: String;

  constructor(
    transportType: transportMode,
    origin: PointOfInterest,
    destination: PointOfInterest,
    pathGraphic: Location,
    pathColor: String
  ) {
    this.transportType = transportType;
    this.origin = origin;
    this.destination = destination;
    this.pathGraphic = pathGraphic; // exclusive to outdoor
    this.pathColor = pathColor;
  }

  displayPath() {
    return (
      // @ts-ignore
      <MapView.Polyline
        strokeWidth={4}
        strokeColor={this.pathColor}
        coordinates={this.pathGraphic}
      />
    );
  }

  // TODO: handle indoor location
  getStartingLocation() {
    if (this.origin instanceof outdoorPOI) {
      return this.origin.getLocation();
    }
    return new Location(0, 0);
  }

  // TODO: handle indoor location
  getEndingLocation() {
    if (this.destination instanceof outdoorPOI) {
      return this.destination.getLocation();
    }
    return new Location(0, 0);
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

export default UnitPath;
