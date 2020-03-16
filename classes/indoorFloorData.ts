import Coordinate from './Coordinate';

class IndoorFloorData {
    floorImage: any;
    imageWidthPX: number;
    imageHeightPX: number;
    floorNumber: string;
    buildingName: string;
    walkways: {topLeft: Coordinate, bottomRight: Coordinate}[];
    elevator: Coordinate;
    bathrooms: Coordinate[];
    entrance: Coordinate;
    waterFountains: Coordinate[];
    classRooms: {classRoom: string, location: Coordinate};
    
    constructor(floorImage, floorNumber, buildingName, imageWidthPX, imageHeightPX, walkwayData) {
        this.floorImage = floorImage;
        this.floorNumber = floorNumber;
        this.buildingName = buildingName;
        this.imageWidthPX = imageWidthPX;
        this.imageHeightPX = imageHeightPX;
        this.walkways = walkwayData;
    }
}

export default IndoorFloorData;

