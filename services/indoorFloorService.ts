import IndoorFloor from "../classes/indoorFloor";
import Hall1 from "../constants/indoor-data/Hall1";
import IndoorFloorData from "../classes/indoorFloorData";
import BuildingService from "./buildingService";

//Purpose of this variable is to initialize all indoor floors and store them into memory
const IndoorFloorService ={
    allFloorData: <IndoorFloorData[]>[Hall1],
    createdFloors: <IndoorFloor[]>[],

    init() {
        //Builds the floor objects based off of the floordata files
        IndoorFloorService.allFloorData.forEach(floorData =>{
            let building = BuildingService.getBuildingByName(floorData.buildingName);
            let floor = new IndoorFloor(building, floorData);
            this.createdFloors.push(floor);
        })
    },

    getFloor(buildingName: string, floorNumber) {
        return IndoorFloorService.createdFloors.find(u => u.floorData.floorNumber == floorNumber && u.building.getIdentifier() == buildingName);
    }

}

export default IndoorFloorService;