import React from 'react';
import UnitPath from '../interfaces/unitPath';
import Path from '../interfaces/path';

class CompoundPath implements Path {
  paths: UnitPath[] = [];

  addUnitPath(newUnitPath: UnitPath) {
    this.paths.push(newUnitPath);
  }

  removeUnitPath(unitPath: UnitPath) {
    const arrayIndex = this.paths.indexOf(unitPath);
    if (arrayIndex >= 0) {
      this.paths.splice(arrayIndex, 1);
    }
  }

  getStartingLocation() {
    return this.paths[0].getStartingLocation();
  }

  getEndingLocation() {
    return this.paths[this.paths.length - 1].getEndingLocation();
  }

  getAllPaths() {
    return this.paths;
  }

  mergeCompoundPath(pathsToAdd: CompoundPath) {
    this.paths = this.paths.concat(pathsToAdd.getAllPaths());
  }

  // based on the parameters specified, it will return the html to display the path
  displayPath(isInside, buildingName = null, floorNumber = null) {
    return <>{this.paths.map(path => path.displayPath(isInside, buildingName, floorNumber))}</>;
  }
}

export default CompoundPath;
