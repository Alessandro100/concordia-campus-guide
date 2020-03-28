import { Dimensions } from 'react-native';
import IndoorFloor from '../classes/indoorFloor';
import Hall1 from '../constants/indoor-data/Hall1';
import Hall8 from '../constants/indoor-data/Hall8';
import VL1 from '../constants/indoor-data/VL1';
import { obtainBuildings } from './buildingService';

// Purpose of this variable is to initialize all indoor floors and store them into memory
const IndoorFloorService = {
  allFloorData: [Hall1, Hall8, VL1],
  createdFloors: [],

  init() {
    // Builds the floor objects based off of the floordata files
    IndoorFloorService.createdFloors = [];
    IndoorFloorService.allFloorData.forEach(floorData => {
      const building = obtainBuildings().find(b => b.title === floorData.buildingName);
      const floor = new IndoorFloor(building,  floorData);
      const windowWidth = Dimensions.get('window').width;
      floor.setImageWidth(windowWidth);
      floor.setInitialHeightPosition(100);
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
};

export default IndoorFloorService;
