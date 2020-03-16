import Building from "../classes/building";
import Location from "../classes/location";

//Purpose of this class is to initialize all buildings and store them into memory
const BuildingService = {
    buildings: <Building[]>[],

    init() {
        ///THIS IS TEMPORARY (just to have 1 building), THIS WILL BE INITIATED MORE PROPERLY
        let tempLocation = new Location(45.497256, -73.578956);
        let tempBuilding = new Building('null desc', [], null, tempLocation, 'Hall');
        BuildingService.buildings = [tempBuilding];
    },

    getBuildingByName(buildingName: string){
        return this.buildings.find(b => b.getIdentifier() == buildingName);
    }
}

export default BuildingService; 