import { Graph } from '@dagrejs/graphlib';
import IndoorFloorData from './indoorFloorData';
import Coordinate from './coordinate';
import IndoorPOI from './indoorPOI';

class IndoorFloorFactory {
  graphWidth: number;

  graphHeight: number;

  floorData: IndoorFloorData;

  constructor(graphWidth, graphHeight, floorData) {
    this.graphWidth = graphWidth;
    this.graphHeight = graphHeight;
    this.floorData = floorData;
  }

  // generates a graph based on walkable path and IndoorPOI
  generateGraph() {
    const graph = new Graph({ directed: false });
    for (let i = 0; i < this.graphHeight; i += 1) {
      for (let z = 0; z < this.graphWidth; z += 1) {
        const isWalkable = this.isLocationWalkable(z, i);
        const isIndoorPOI = this.isIndoorPOI(z, i);
        if (isWalkable || isIndoorPOI) {
          const coordinate = new Coordinate(z, i);
          // this method is part of the indoor floor creation, can't get the floor its building
          // const indoorFloor = IndoorFloorService.getFloor(
          //   this.floorData.buildingName,
          //   this.floorData.floorNumber
          // );
          const tile = new IndoorPOI('walkway-node', coordinate, null, 'walkway');
          const nodeKey = `${z}-${i}`;
          graph.setNode(nodeKey, tile);

          // includes up-down-left-right movement
          const upNodeKey = `${z}-${i - 1}`;
          const downNodeKey = `${z}-${i + 1}`;
          const leftNodeKey = `${z - 1}-${i}`;
          const rightNodeKey = `${z + 1}-${i}`;
          if (graph.hasNode(upNodeKey)) {
            graph.setEdge(nodeKey, upNodeKey, `${nodeKey}-@-${upNodeKey}`);
          }
          if (graph.hasNode(downNodeKey)) {
            graph.setEdge(nodeKey, downNodeKey, `${nodeKey}-@-${downNodeKey}`);
          }
          if (graph.hasNode(leftNodeKey)) {
            graph.setEdge(nodeKey, leftNodeKey, `${nodeKey}-@-${leftNodeKey}`);
          }
          if (graph.hasNode(rightNodeKey)) {
            graph.setEdge(nodeKey, rightNodeKey, `${nodeKey}-@-${rightNodeKey}`);
          }

          // includes diagonal movement
          const topLeftNodeKey = `${z - 1}-${i + 1}`;
          const bottomLeftNodeKey = `${z - 1}-${i - 1}`;
          const topRightNodeKey = `${z + 1}-${i + 1}`;
          const bottomRightNodeKey = `${z + 1}-${i - 1}`;
          if (graph.hasNode(topLeftNodeKey)) {
            graph.setEdge(nodeKey, topLeftNodeKey, `${nodeKey}-@-${topLeftNodeKey}`);
          }
          if (graph.hasNode(bottomLeftNodeKey)) {
            graph.setEdge(nodeKey, bottomLeftNodeKey, `${nodeKey}-@-${bottomLeftNodeKey}`);
          }
          if (graph.hasNode(topRightNodeKey)) {
            graph.setEdge(nodeKey, topRightNodeKey, `${nodeKey}-@-${topRightNodeKey}`);
          }
          if (graph.hasNode(bottomRightNodeKey)) {
            graph.setEdge(nodeKey, bottomRightNodeKey, `${nodeKey}-@-${bottomRightNodeKey}`);
          }
        }
      }
    }
    return graph;
  }

  /**
  elevator: Coordinate;
  staircase: Coordinate;
  bathrooms: Coordinate[];
  entrance: Coordinate;
  waterFountains: Coordinate[];
  classRooms: { classRoom: string; location: Coordinate }[];
   */
  isIndoorPOI(xIndex, yIndex) {
    const isElevator =
      this.floorData.elevator &&
      this.floorData.elevator.x === xIndex &&
      this.floorData.elevator.y === yIndex;
    const isStaircase =
      this.floorData.staircase &&
      this.floorData.staircase.x === xIndex &&
      this.floorData.staircase.y === yIndex;
    const isEntrance =
      this.floorData.entrance &&
      this.floorData.entrance.x === xIndex &&
      this.floorData.entrance.y === yIndex;
    let isBathroom = false;
    let isWaterFountain = false;
    let isClassroom = false;
    if (this.floorData.bathrooms) {
      this.floorData.bathrooms.forEach(bathroom => {
        if (bathroom.x === xIndex && bathroom.y === yIndex) {
          isBathroom = true;
        }
      });
    }
    if (this.floorData.waterFountains) {
      this.floorData.waterFountains.forEach(waterFountain => {
        if (waterFountain.x === xIndex && waterFountain.y === yIndex) {
          isWaterFountain = true;
        }
      });
    }
    if (this.floorData.classRooms) {
      this.floorData.classRooms.forEach(classRoom => {
        if (classRoom.location.x === xIndex && classRoom.location.y === yIndex) {
          isClassroom = true;
        }
      });
    }
    return isElevator || isStaircase || isEntrance || isBathroom || isWaterFountain || isClassroom;
  }

  // determines if the location at the given index is walkable based on the walking data.
  isLocationWalkable(xIndex, yIndex) {
    let isWalkable = false;
    this.floorData.walkways.forEach(obj => {
      if (
        xIndex >= obj.topLeft.x &&
        xIndex <= obj.bottomRight.x &&
        yIndex >= obj.topLeft.y &&
        yIndex <= obj.bottomRight.y
      ) {
        isWalkable = true;
      }
    });
    return isWalkable;
  }
}

export default IndoorFloorFactory;
