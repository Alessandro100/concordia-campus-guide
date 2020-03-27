import RouteCalculator from '../interfaces/routeCalculator';
import Path from '../interfaces/path';
import GoogleMapsAdapter from './googleMapsAdapter';
import OutdoorPOI from './outdoorPOI';
import IndoorPOI from './indoorPOI';
import transportMode from './transportMode';
import PointOfInterest from './pointOfInterest';
import IndoorFloor from './indoorFloor';
import Coordinate from './coordinate';
import IndoorFloorService from '../services/indoorFloorService';
import CompoundPath from './compoundPath';
import IndoorUnitPath from './indoorUnitPath';

// NOTES: This is general directions, has no impact on speed of directions and does not take into account route parameters
class FastestPathCalculator implements RouteCalculator {
  externalRouterAdapter: GoogleMapsAdapter;

  transportType: transportMode;

  startingPOI: PointOfInterest;

  endingPOI: PointOfInterest;

  constructor(
    startingPOI: PointOfInterest,
    endingPOI: PointOfInterest,
    transportType: transportMode
  ) {
    this.externalRouterAdapter = new GoogleMapsAdapter();
    this.startingPOI = startingPOI;
    this.endingPOI = endingPOI;
    this.transportType = transportType;
  }

  calculatePath() {
    return new Promise<Path>((resolve, reject) => {
      // Indoor -> Indoor
      if (this.startingPOI instanceof IndoorPOI && this.endingPOI instanceof IndoorPOI) {
        if (this.isIndoorPOIsameBuilding(this.startingPOI, this.endingPOI)) {
          const indoorDirections = this.getIndoorDirectionsSameBuilding(
            this.startingPOI,
            this.endingPOI
          );
          resolve(this.formatIndoorDirections(indoorDirections));
        } else {
          // MOST COMPLEX CASE: INDOOR -> OUTDOOR -> INDOOR -- not done; TODO
        }
        // Outdoor -> Indoor
      } else if (this.startingPOI instanceof OutdoorPOI && this.endingPOI instanceof IndoorPOI) {
        this.getDirectionsOutdoorToIndoor(this.startingPOI, this.endingPOI).then(
          directions => {
            // structure of directions [indoorPaths] and [outdoorPaths]
            const paths = this.formatIndoorDirections(directions['indoorPaths']);
            paths.mergeCompoundPath(directions['outdoorPaths']);
            resolve(paths);
          },
          err => {
            reject(err);
          }
        );
        // Indoor -> Outdoor
      } else if (this.startingPOI instanceof IndoorPOI && this.endingPOI instanceof OutdoorPOI) {
        this.getDirectionsIndoorToOutdoor(this.startingPOI, this.endingPOI).then(
          directions => {
            const paths = this.formatIndoorDirections(directions['indoorPaths']);
            paths.mergeCompoundPath(directions['outdoorPaths']);
            resolve(paths);
          },
          err => {
            reject(err);
          }
        );
        // Outdoor -> Outdoor
      } else if (this.startingPOI instanceof OutdoorPOI && this.endingPOI instanceof OutdoorPOI) {
        this.getOutdoorPath(this.startingPOI, this.endingPOI).then(
          outdoorPaths => {
            resolve(outdoorPaths);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }

  getOutdoorPath(startLocation: OutdoorPOI, endLocation: OutdoorPOI) {
    return new Promise<Path>((resolve, reject) => {
      this.externalRouterAdapter
        .getDirectionsSteps(
          startLocation.getLocation(),
          endLocation.getLocation(),
          this.transportType
        )
        .then(
          paths => {
            resolve(paths);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  /**
   *
   * @param startingIndoorPOI
   * @param endingIndoorPOI
   * This will return a hash with the structure
   * ['building-floornumber']{
   *    Coordinate[]
   * }
   */
  getIndoorDirectionsSameBuilding = (startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) => {
    const directions = {};
    if (this.isIndoorPOIonSameFloor(startingIndoorPOI, endingIndoorPOI)) {
      // starting and ending location are on the same floor -> no need for elevator or type of transport
      directions[this.getDirectionKey(startingIndoorPOI)] = this.getIndoorDirectionsSameFloor(
        startingIndoorPOI.coordinates,
        endingIndoorPOI.coordinates,
        endingIndoorPOI.indoorFloor
      );
    } else {
      // starting and ending location are on different floors -> elevator needed. TODO: Include a different option for elevator
      directions[this.getDirectionKey(startingIndoorPOI)] = this.getIndoorDirectionsSameFloor(
        startingIndoorPOI.coordinates,
        startingIndoorPOI.indoorFloor.floorData.elevator,
        startingIndoorPOI.indoorFloor
      );
      directions[this.getDirectionKey(endingIndoorPOI)] = this.getIndoorDirectionsSameFloor(
        endingIndoorPOI.indoorFloor.floorData.elevator,
        endingIndoorPOI.coordinates,
        endingIndoorPOI.indoorFloor
      );
    }
    return directions;
  };

  // will return a series of coordinates based on the shortest path
  getIndoorDirectionsSameFloor = (
    startingCoordinate: Coordinate,
    endingCoordinate: Coordinate,
    indoorFloor: IndoorFloor
  ): Coordinate[] => {
    return indoorFloor.getPath(startingCoordinate, endingCoordinate);
  };

  isIndoorPOIsameBuilding = (startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) => {
    return (
      startingIndoorPOI.indoorFloor.building.identifier ===
      endingIndoorPOI.indoorFloor.building.identifier
    );
  };

  isIndoorPOIonSameFloor = (startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) => {
    return (
      startingIndoorPOI.indoorFloor.floorData.floorNumber ===
      endingIndoorPOI.indoorFloor.floorData.floorNumber
    );
  };

  /**
   * based on a indoorPOI, it will return the key for a hash to identify the directions for the floor
   * @param indoorPOI
   * return example: Hall-1
   */
  getDirectionKey = (indoorPOI: IndoorPOI) => {
    return `${indoorPOI.indoorFloor.building.title}-${indoorPOI.indoorFloor.floorData.floorNumber}`;
  };

  getDirectionsOutdoorToIndoor(startingPOI: OutdoorPOI, endingPOI: IndoorPOI) {
    return new Promise((resolve, reject) => {
      const directions = {};
      const { building } = endingPOI.indoorFloor;
      this.externalRouterAdapter
        .getDirectionsSteps(startingPOI.getLocation(), building.getLocation(), this.transportType)
        .then(
          paths => {
            directions['outdoorPaths'] = paths;
            const startingFloor = IndoorFloorService.getFloor(building.getIdentifier(), 1); // TODO: Find a way to get starting floor: default = 1
            const startingIndoorPOI = new IndoorPOI(
              'building-entrance',
              startingFloor.floorData.entrance,//NOT DEFINED
              startingFloor,
              'entrance'
            );
            directions['indoorPaths'] = this.getIndoorDirectionsSameBuilding(
              startingIndoorPOI,
              endingPOI
            );
            resolve(directions);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  //THIS METHOD NEEDS FIXING
  getDirectionsIndoorToOutdoor(startingPOI: IndoorPOI, endingPOI: OutdoorPOI) {
    return new Promise((resolve, reject) => {
      const directions = {};
      const { building } = startingPOI.indoorFloor;
      const startingFloor = IndoorFloorService.getFloor(building.getIdentifier(), 1); // TODO: Find a way to get starting floor: default = 1
      const exitPOI = new IndoorPOI(
        'building-entrance',
        startingFloor.floorData.entrance,//NOT DEFINED
        startingFloor,
        'entrance'
      );
      directions['indoorPaths'] = this.getIndoorDirectionsSameBuilding(startingPOI, exitPOI);
      this.externalRouterAdapter
        .getDirectionsSteps(building.getLocation(), endingPOI.getLocation(), this.transportType)
        .then(
          paths => {
            directions['outdoorPaths'] = paths;
            resolve(directions);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  /**
   * This functions takes a hash of indoor floors with Coordinates and turns them into Compound Paths
   * @param floors: Hashmap of floor keys containing arrays of coordinates
   * floor key is the building + floor number ex: 'Hall-1'
   */
  formatIndoorDirections(floors): CompoundPath {
    const paths = new CompoundPath();
    Object.keys(floors).forEach(floorKey => {
      const coordinates: Coordinate[] = floors[floorKey];
      for (let i = 0; i < coordinates.length - 1; i += 1) {
        if (coordinates[i + 1]) {
          const decodedFloorKey = this.decodeFloorKey(floorKey);
          const indoorFloorObject = IndoorFloorService.getFloor(
            decodedFloorKey.buildingName, 
            decodedFloorKey.floorNumber
          );
          const startingIndoorPOI = new IndoorPOI(
            `walkway-${floorKey}-${i}`,
            coordinates[i],
            indoorFloorObject,
            'walkway'
          );
          const endingIndoorPOI = new IndoorPOI(
            `walkway-${floorKey}-${i + 1}`,
            coordinates[i + 1],
            indoorFloorObject,
            'walkway'
          );
          const indoorPath = new IndoorUnitPath(
            this.transportType,
            startingIndoorPOI,
            endingIndoorPOI,
            indoorFloorObject
          );
          paths.addUnitPath(indoorPath);
        }
      }
    });
    return paths;
  }
  // floorKey = Building name + - + room number. Ex: Hall-1, JMSB-4
  decodeFloorKey = floorKey => {
    const pieces = floorKey.split('-');
    return { buildingName: pieces[0], floorNumber: pieces[1] };
  };
}

export default FastestPathCalculator;
