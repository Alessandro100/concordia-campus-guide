import React from 'react';
import UnitPath from './unitPath';
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

  displayPath() {
    return <>{this.paths.map(path => path.displayPath())}</>;
  }
}

export default CompoundPath;
