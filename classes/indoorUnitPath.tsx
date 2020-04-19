import React from 'react';
import transportMode from './transportMode';
import UnitPath from '../interfaces/unitPath';
import IndoorPOI from './indoorPOI';
import IndoorFloor from './indoorFloor';

class IndoorUnitPath implements UnitPath {
  transportType: transportMode;

  origin: IndoorPOI;

  destination: IndoorPOI;

  pathColor: string;

  indoorFloor: IndoorFloor;

  pathInstruction: string;

  constructor(
    transportType: transportMode,
    origin: IndoorPOI,
    destination: IndoorPOI,
    indoorFloor: IndoorFloor
    /* pathInstruction: string */
  ) {
    this.transportType = transportType;
    this.origin = origin;
    this.destination = destination;
    this.indoorFloor = indoorFloor;
    this.pathColor = 'purple';
    this.pathInstruction = 'dummy string';
  }

  displayPath(isIndoor, buildingName?, floorNumber?) {
    if (
      isIndoor &&
      this.indoorFloor.floorData.buildingName === buildingName &&
      String(this.indoorFloor.floorData.floorNumber) === String(floorNumber)
    ) {
      return this.indoorFloor.drawLines([this.origin.coordinates, this.destination.coordinates]);
    }

    // returns empty html
    return <></>;
  }

  getPathInstruction(isIndoor, buildingName?, floorNumber?) {
    if (
      isIndoor &&
      this.indoorFloor.floorData.buildingName === buildingName &&
      String(this.indoorFloor.floorData.floorNumber) === String(floorNumber)
    ) {
      return '';
    }

    // returns empty html
    return '';
  }

  getStartingLocation() {
    return this.origin.coordinates;
  }

  getEndingLocation() {
    return this.origin.coordinates;
  }

  getTransportMode() {
    return this.transportType;
  }
}

export default IndoorUnitPath;
