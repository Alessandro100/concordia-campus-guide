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

  pathInstruction: string;

  constructor(
    transportType: transportMode,
    origin: OutdoorPOI,
    destination: OutdoorPOI,
    pathGraphic: Location,
    pathColor: String,
    pathInstruction: string,
  ) {
    this.transportType = transportType;
    this.origin = origin;
    this.destination = destination;
    this.pathGraphic = pathGraphic; // exclusive to outdoor
    this.pathColor = pathColor;
    this.pathInstruction = pathInstruction;
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

  getPathInstruction(isIndoor){
     //console.log(this.pathInstruction);
     if(!isIndoor){
      return this.pathInstruction;
     }
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
