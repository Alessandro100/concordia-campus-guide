import RouteCalculator from '../interfaces/routeCalculator';
import Path from '../interfaces/path';
import GoogleMapsAdapter from './googleMapsAdapter';
import OutdoorPOI from './outdoorPOI';
import IndoorPOI from './indoorPOI';
import transportMode from './transportMode';
import PointOfInterest from './pointOfInterest';
import IndoorFloor from './indoorFloor';
import Coordinate from './Coordinate';
import IndoorFloorService from '../services/indoorFloorService';

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

  // NOTE: for now we will only deal with external paths
  calculatePath() {
    return new Promise<Path>((resolve, reject) => {
      ///TODO: Solve the promise return data!

      //Indoor -> Indoor
      if (this.startingPOI instanceof IndoorPOI && this.endingPOI instanceof IndoorPOI) {
        if(this.isIndoorPOIsameBuilding(this.startingPOI, this.endingPOI)) {
          return this.getIndoorDirectionsSameBuilding(this.startingPOI, this.endingPOI); //FIGURE OUT THE RESOLVE SHIT -- NEW LMAO
        } else {
          //MOST COMPLEX CASE: INDOOR -> OUTDOOR -> INDOOR -- not done;
        }
      //Outdoor -> Indoor
      } else if(this.startingPOI instanceof OutdoorPOI && this.endingPOI instanceof IndoorPOI) {
        this.getDirectionsOutdoorToIndoor(this.startingPOI, this.endingPOI).then(res =>{
          //something
        })
      //Indoor -> Outdoor
      } else if(this.startingPOI instanceof IndoorPOI && this.endingPOI instanceof OutdoorPOI) {
        return this.getDirectionsIndoorToOutdoor(this.startingPOI, this.endingPOI);
      //Outdoor -> Outdoor
      }else if (this.startingPOI instanceof OutdoorPOI && this.endingPOI instanceof OutdoorPOI) {
        this.getOutdoorPath(this.startingPOI, this.endingPOI).then(outdoorPaths => {
            resolve(outdoorPaths);
          }, err => {
            reject(err);
          }
        );
      }
    });
  }

  // TODO: will need to specify: best route, wheel chair accessible, or less walking
  // NOTE: passing these parameters into google api does all the work for us
  // NOTE: this function returns a compound path
  getOutdoorPath(startLocation: OutdoorPOI, endLocation: OutdoorPOI) {
    return new Promise<Path>((resolve, reject) => {
      this.externalRouterAdapter.getDirectionsSteps(startLocation.getLocation(), endLocation.getLocation(), this.transportType).then(paths => {
        resolve(paths);
      }, err => {
        reject(err);
      });
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
  getIndoorDirectionsSameBuilding(startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) {
    let directions = {};
    if(this.isIndoorPOIonSameFloor) {
      //starting and ending location are on the same floor -> no need for elevator or type of transport
      directions[this.getDirectionKey(startingIndoorPOI)] = this.getIndoorDirectionsSameFloor(startingIndoorPOI.coordinates, endingIndoorPOI.coordinates, endingIndoorPOI.indoorFloor);
    } else {
      //starting and ending location are on different floors -> elevator needed. TODO: Include a different option for elevator
      directions[this.getDirectionKey(startingIndoorPOI)] = this.getIndoorDirectionsSameFloor(startingIndoorPOI.coordinates, startingIndoorPOI.indoorFloor.floorData.elevator, startingIndoorPOI.indoorFloor);
      directions[this.getDirectionKey(endingIndoorPOI)] = this.getIndoorDirectionsSameFloor(endingIndoorPOI.indoorFloor.floorData.elevator, endingIndoorPOI.coordinates, endingIndoorPOI.indoorFloor);
    }
    return directions;
  }

  //will return a series of coordinates based on the shortest path
  getIndoorDirectionsSameFloor(startingCoordinate: Coordinate, endingCoordinate: Coordinate, indoorFloor: IndoorFloor): Coordinate[] {
    return indoorFloor.getPath(startingCoordinate, endingCoordinate);
  }

  isIndoorPOIsameBuilding(startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) {
    return startingIndoorPOI.indoorFloor.building.identifier === endingIndoorPOI.indoorFloor.building.identifier;
  }

  //bad coupling -- to revise
  isIndoorPOIonSameFloor(startingIndoorPOI: IndoorPOI, endingIndoorPOI: IndoorPOI) {
    return startingIndoorPOI.indoorFloor.floorData.floorNumber === endingIndoorPOI.indoorFloor.floorData.floorNumber;
  }

  //based on a indoorPOI, it will return the key for a hash to identify the directions for the floor
  getDirectionKey(indoorPOI: IndoorPOI) {
    return indoorPOI.indoorFloor.building.identifier + '-' + indoorPOI.indoorFloor.floorData.floorNumber;
  }

  //TODO: Issue getting the building / floor
  getDirectionsOutdoorToIndoor(startingPOI: OutdoorPOI, endingPOI: IndoorPOI) {
    return new Promise((resolve, reject) =>{
      let directions = {};
      const building = endingPOI.indoorFloor.building;
      //essentially what I need to know is the indoorPOI: building and its starting floor
      this.externalRouterAdapter.getDirectionsSteps(startingPOI.getLocation(), building.getLocation(), this.transportType).then(paths =>{
        directions['outdoorPaths'] = paths;
        const startingFloor = IndoorFloorService.getFloor(building.getIdentifier(), 1); //TODO: Find a way to get starting floor: default = 1
        const startingIndoorPOI = new IndoorPOI('building-entrance', startingFloor.floorData.entrance, 'entrance')
        directions['indoorPaths'] = this.getIndoorDirectionsSameBuilding(startingIndoorPOI, endingPOI);
        resolve(directions);
      }, err =>{
        reject(err);
      })
    })
  }

  //TODO: Issue getting the building / floor
  getDirectionsIndoorToOutdoor(startingPOI: IndoorPOI, endingPOI: OutdoorPOI) {
    return new Promise((resolve, reject) =>{
      let directions = {};
      const building = startingPOI.indoorFloor.building;
      const startingFloor = IndoorFloorService.getFloor(building.getIdentifier(), 1); //TODO: Find a way to get starting floor: default = 1
      const exitPOI = new IndoorPOI('building-entrance', startingFloor.floorData.entrance, 'entrance')
      directions['indoorPaths'] = this.getIndoorDirectionsSameBuilding(startingPOI, exitPOI);
      this.externalRouterAdapter.getDirectionsSteps(building.getLocation(), endingPOI.getLocation() , this.transportType).then(paths =>{
        directions['outdoorPaths'] = paths;
        resolve(directions);
      }, err =>{
        reject(err);
      })
    })
  }
}

export default FastestPathCalculator;
