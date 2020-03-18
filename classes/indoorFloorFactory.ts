import { Graph } from '@dagrejs/graphlib';
import IndoorFloorData from './indoorFloorData';
import Coordinate from './coordinate';
import IndoorPOI from './indoorPOI';
import IndoorFloorService from '../services/indoorFloorService';

class IndoorFloorFactory {
  graphWidth: number;

  graphHeight: number;

  floorData: IndoorFloorData;

  constructor(graphWidth, graphHeight, floorData) {
    this.graphWidth = graphWidth;
    this.graphHeight = graphHeight;
    this.floorData = floorData;
  }

  // generates a graph based on walkable path
  generateGraph() {
    const graph = new Graph({ directed: false });
    for (let i = 0; i < this.graphHeight; i += 1) {
      for (let z = 0; z < this.graphWidth; z += 1) {
        if (this.isLocationWalkable(z, i)) {
          const coordinate = new Coordinate(z, i);
          const indoorFloor = IndoorFloorService.getFloor(
            this.floorData.buildingName,
            this.floorData.floorNumber
          );
          const tile = new IndoorPOI('walkway-node', coordinate, indoorFloor, 'walkway');
          const nodeKey = `${z}-${i}`;
          graph.setNode(nodeKey, tile);
          const upNodeKey = `${z}-${i - 1}`;
          const downNodeKey = `${z}-${i + 1}`;
          const leftNodeKey = `${z - 1}-${i}`;
          const rightNodeKey = `${z + 1}-${i}`;
          if (graph.hasNode(upNodeKey)) {
            graph.setEdge(nodeKey, upNodeKey, `${nodeKey}@${upNodeKey}`);
          }
          if (graph.hasNode(downNodeKey)) {
            graph.setEdge(nodeKey, downNodeKey, `${nodeKey}@${downNodeKey}`);
          }
          if (graph.hasNode(leftNodeKey)) {
            graph.setEdge(nodeKey, leftNodeKey, `${nodeKey}@${leftNodeKey}`);
          }
          if (graph.hasNode(rightNodeKey)) {
            graph.setEdge(nodeKey, rightNodeKey, `${nodeKey}@${rightNodeKey}`);
          }
        }
      }
    }
    return graph;
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
