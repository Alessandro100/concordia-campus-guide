import { Dimensions } from 'react-native';
import IndoorFloor from '../classes/indoorFloor';
import Hall1 from '../constants/indoor-data/Hall1';
import Hall8 from '../constants/indoor-data/Hall8';
import VL1 from '../constants/indoor-data/VL1';
import { obtainBuildings } from './buildingService';
import IndoorPOIService from './indoorPOIService';
import IndoorPOI from '../classes/indoorPOI';

// Purpose of this variable is to initialize all indoor floors and store them into memory
const IndoorFloorService = {
  allFloorData: [Hall1, Hall8, VL1],
  createdFloors: [],

  init() {
    // Builds the floor objects based off of the floordata files
    IndoorFloorService.createdFloors = [];
    IndoorFloorService.allFloorData.forEach(floorData => {
      const building = obtainBuildings().find(b => b.title === floorData.buildingName);
      const floor = new IndoorFloor(building, floorData);
      const windowWidth = Dimensions.get('window').width;
      floor.setImageWidth(windowWidth);
      floor.setInitialHeightPosition(100);
      IndoorFloorService.setIndoorPOI(floor);
      IndoorFloorService.createdFloors.push(floor);
    });
  },

  getFloor(buildingName: string, floorNumber: number) {
    return IndoorFloorService.createdFloors.find(
      u =>
        String(u.floorData.floorNumber) === String(floorNumber) && u.building.title === buildingName
    );
  },

  getAvailableIndoorFloorsForBuilding(buildingName: string) {
    return IndoorFloorService.createdFloors.filter(floor => floor.building.title === buildingName);
  },

  /**
   * Takes all the floor data indoor POI and saves them to memory
   * @param indoorFloor 
   * elevator: Coordinate;
    bathrooms: Coordinate[];
    entrance: Coordinate;
    waterFountains: Coordinate[];
    classRooms: {classRoom: string, location: Coordinate};
   */
  setIndoorPOI(indoorFloor: IndoorFloor) {
    IndoorPOIService.clearIndoorPOIs();
    Object.keys(indoorFloor.floorData).forEach(attribute => {
      let identifier = `${indoorFloor.floorData.buildingName}-${indoorFloor.floorData.floorNumber}`; // ex: hall-8
      if (
        (attribute === 'elevator' || attribute === 'entrance') &&
        indoorFloor.floorData[attribute]
      ) {
        identifier += `-${attribute}`; // ex: hall-8-elevator
        const indoorPOI = new IndoorPOI(
          identifier,
          indoorFloor.floorData[attribute],
          indoorFloor,
          attribute
        );
        IndoorPOIService.addIndoorPOI(indoorPOI);
      }
      if (
        (attribute === 'bathrooms' || attribute === 'waterFountains') &&
        indoorFloor.floorData[attribute]
      ) {
        indoorFloor.floorData[attribute].forEach((object, i) => {
          identifier += `-${attribute}-${i}`; // ex: hall-8-bathrooms-1
          const indoorPOI = new IndoorPOI(identifier, object, indoorFloor, attribute);
          IndoorPOIService.addIndoorPOI(indoorPOI);
        });
      }
      if (attribute === 'classRooms' && indoorFloor.floorData[attribute]) {
        identifier += `-${attribute}-${indoorFloor.floorData.classRooms.classRoom}`; // ex: hall-8-classRooms-H681
        const indoorPOI = new IndoorPOI(
          identifier,
          indoorFloor.floorData[attribute].location,
          indoorFloor,
          attribute
        );
        IndoorPOIService.addIndoorPOI(indoorPOI);
      }
    });
  },
};

export default IndoorFloorService;
