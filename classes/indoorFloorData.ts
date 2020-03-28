import Coordinate from './coordinate';

class IndoorFloorData {
    floorImage: any;
    imageWidthPX: number;
    imageHeightPX: number;
    floorNumber: string;
    buildingName: string;
    walkways: {topLeft: Coordinate, bottomRight: Coordinate}[];
    elevator: Coordinate;
    staircase: Coordinate;
    bathrooms: Coordinate[];
    entrance: Coordinate;
    waterFountains: Coordinate[];
    classRooms: {classRoom: string, location: Coordinate}[];
    
    constructor(floorImage, floorNumber, buildingName, imageWidthPX, imageHeightPX, elevatorData, walkwayData, staircaseData, bathroomData, entranceData, waterFountainsData, classroomsData) {
        this.floorImage = floorImage;
        this.floorNumber = floorNumber;
        this.buildingName = buildingName;
        this.imageWidthPX = imageWidthPX;
        this.imageHeightPX = imageHeightPX;
        this.walkways = walkwayData;
        this.bathrooms = bathroomData;
        this.waterFountains = waterFountainsData;
        this.classRooms = classroomsData;
        this.staircase = staircaseData;
        this.elevator = elevatorData;
        if (floorNumber === 1) {
            this.entrance = entranceData;
        }
        else this.entrance = null;

    }
}

export default IndoorFloorData;

