import Coordinate from './coordinate';

class IndoorFloorData {
  floorImage: any;

  imageWidthPX: number;

  imageHeightPX: number;

  floorNumber: string;

  buildingName: string;

  walkways: { topLeft: Coordinate; bottomRight: Coordinate }[];

  elevator: Coordinate;

  staircase: Coordinate;

  bathrooms: Coordinate[];

  entrance: Coordinate;

  waterFountains: Coordinate[];

  classRooms: { classRoom: string; location: Coordinate }[];

  constructor(
    floorImage: any,
    floorNumber: any,
    buildingName: string,
    imageWidthPX: number,
    imageHeightPX: number,
    elevatorData: Coordinate,
    walkwayData: { topLeft: Coordinate; bottomRight: Coordinate }[],
    staircaseData: Coordinate,
    bathroomData: Coordinate[],
    entranceData: Coordinate,
    waterFountainsData: Coordinate[],
    classroomsData: { classRoom: string; location: Coordinate }[]
  ) {
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
    } else this.entrance = null;
  }
}

export default IndoorFloorData;
