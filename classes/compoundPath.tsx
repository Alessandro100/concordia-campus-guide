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

  // based on the parameters specificed, it will return the html to display the instructions
  getPathInstruction(isInside, buildingName = null, floorNumber = null) {
    const pathInstructions = this.paths.map(path =>
      path.getPathInstruction(isInside, buildingName, floorNumber)
    );
    const regex1 = /(<b>)/gi;
    const regex2 = /(<\/b>)/gi;
    const regex3 = /<div style="font-size:0.9em">/gi;
    const regex4 = /<\/div>/gi;
    const regex5 = /<wbr\/>/gi;
    const instructionList: string[] = pathInstructions.map(function(pathInstruction) {
      return pathInstruction
        .replace(regex1, '')
        .replace(regex2, '')
        .replace(regex3, ' ')
        .replace(regex4, '')
        .replace(regex5, '');
    });
    console.log(instructionList.filter(instruction => instruction !== ''));
    return instructionList.filter(instruction => instruction !== '');
  }
}

export default CompoundPath;
