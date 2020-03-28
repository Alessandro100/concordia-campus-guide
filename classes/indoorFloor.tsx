import React from 'react';
import { View, Image } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import { Graph } from '@dagrejs/graphlib';
import IndoorFloorFactory from './indoorFloorFactory';
import Coordinate from './coordinate';
import IndoorFloorData from './indoorFloorData'
import Building from './building';

const sampleStartPoint: Coordinate = {x: 8, y: 29}; 
const sampleEndPoint: Coordinate = {x: 24, y: 20};

class IndoorFloor {
    graphWidth = 30;
    graphHeight = 30;
    imageWidth: number;
    imageHeight: number;
    initialHeightPosition: number = 0;
    initialWidthPosition: number = 0;

    //graph: Graph;
    //Added by NS
    adjacencyMatrix: number[][];
    /////////////////
    building: Building;
    floorData: IndoorFloorData;
    indoorFloorFactory: IndoorFloorFactory;
    isBuildingEntrance: boolean;

    constructor(building:Building, floorData: IndoorFloorData) {
        this.building = building;
        this.floorData = floorData;

        //display properties
        this.setImageWidth(floorData.imageWidthPX);
        this.indoorFloorFactory = new IndoorFloorFactory(this.graphWidth, this.graphHeight, this.floorData);
        //Added by NS
        this.initializeAdjacencyMatrix();
        this.fillInAdjacencyMatrix();

        //this.graph = this.indoorFloorFactory.generateGraph();
    }

    setInitialWidthPosition(newInitialWidthPosition) {
        this.initialWidthPosition = newInitialWidthPosition;
    }

    setInitialHeightPosition(newInitialHeightPosition) {
        this.initialHeightPosition = newInitialHeightPosition;
    }

    setImageWidth(newImageWidth: number){
        this.imageWidth = newImageWidth;
        const ratio = this.floorData.imageWidthPX / this.floorData.imageHeightPX;
        this.imageHeight = newImageWidth*ratio;
    }

    showFloorImage(){
        return(
            <Image
                resizeMode={'cover'}
                style={{width: this.imageWidth, height: this.imageHeight, position: "absolute", top: this.initialHeightPosition, left: this.initialWidthPosition, zIndex: 4}}
                source={this.floorData.floorImage}
            />
        )
    }

    getWalkwayTileColor(xIndex, yIndex) {
        let color = 'red';
        this.floorData.walkways.forEach(obj =>{
            if(xIndex >= obj.topLeft.x && xIndex <= obj.bottomRight.x && yIndex >= obj.topLeft.y && yIndex <= obj.bottomRight.y) {
                color = 'blue';
            }
        })
        if(xIndex === sampleStartPoint.x && yIndex === sampleStartPoint.y) {
            color = 'white'
        }
        if(xIndex === sampleEndPoint.x && yIndex === sampleEndPoint.y) {
            color = 'black'
        }
        return color;
    }

    showIndoorTile() {
        let array = [];
        const widthPerTile = this.imageWidth / this.graphHeight;
        const heightPerTile = this.imageHeight / this.graphHeight;

        for (let i = 0; i < this.graphHeight; i = i + 1) {
            let yPosition = (i * heightPerTile) + this.initialHeightPosition;
            for (let z = 0; z < this.graphWidth; z = z + 1) {
                let xPosition = z * widthPerTile + this.initialWidthPosition;
                array.push(
                    <View 
                        key={i + " " + z} 
                        style={{ 
                            zIndex: 5, 
                            position: 'absolute', 
                            top: yPosition, 
                            left: xPosition, 
                            borderRadius: 2, 
                            backgroundColor: this.getWalkwayTileColor(z, i), 
                            width: widthPerTile, 
                            height: heightPerTile, 
                            opacity: 0.5 
                    }}>
                    </View>
                )
            }
        }
        return array;
    }

    drawPath(startingCoordinate, endingCoordinate) {
        const coordinates = this.getPath(startingCoordinate, endingCoordinate);
        return this.drawLines(coordinates);
    }

    drawLines(path: Coordinate[]) {
        let lines = []
        const widthPerTile = this.imageWidth / this.graphWidth;
        const heightPerTile = this.imageHeight / this.graphHeight;

        for (let pathIndex = 0; pathIndex < path.length - 1; pathIndex = pathIndex + 1) {
            const xPosition = path[pathIndex].x * widthPerTile;
            const yPosition = path[pathIndex].y * heightPerTile;

            const startingLocation = {
                xpx: path[pathIndex].x * widthPerTile + (0.5 * widthPerTile),
                ypx: path[pathIndex].y * heightPerTile + (0.5 * heightPerTile)
            }
            const endingLocation = {
                xpx: path[pathIndex + 1].x * widthPerTile + (0.5 * widthPerTile),
                ypx: path[pathIndex + 1].y * heightPerTile + (0.5 * heightPerTile)
            }
            lines.push(
                <Svg height={this.imageHeight} width={this.imageWidth} style={{ zIndex: 6, top: this.initialHeightPosition, position: 'absolute' }} origin="0, 0" >
                    <Line x1={startingLocation.xpx} y1={startingLocation.ypx} x2={endingLocation.xpx} y2={endingLocation.ypx} stroke="blue" strokeWidth="2" />
                </Svg>
            )
        }
        return lines;
    }

    //returns the data on how to get from one tile to another
    getPath(startingNode: Coordinate, endingNode: Coordinate): Coordinate[] {
        let nearestWalkableNodesToStartNode = this.getNearestWalkableCoordinate(startingNode);
        let nearestWalkableNodesToEndNode  = this.getNearestWalkableCoordinate(endingNode);
        let possiblePaths = new Array();
        for(let i = 0; i < nearestWalkableNodesToStartNode.length; i++){
            let pathInformation = new Array();
            let startNode = nearestWalkableNodesToStartNode[i][1];
            for(let j = 0; j < nearestWalkableNodesToEndNode.length; j++){
                let endNode = nearestWalkableNodesToEndNode[j][1];
                pathInformation.push(startNode);
                pathInformation.push(endNode);
                let bfsResult = this.bfs(startNode, endNode);
                pathInformation.push(bfsResult[0]);
                pathInformation.push(bfsResult[1]);
                possiblePaths.push(pathInformation);
            }
        }

        let locationOfMinDistance = 0;
        let minDistance = possiblePaths[0][4];
        for(let i = 1; i < possiblePaths.length; i++){
            if(minDistance < possiblePaths[i][4]){
                minDistance = possiblePaths[i][4];
                locationOfMinDistance = i;
            }
        } 

        let minimalNodePath = possiblePaths[locationOfMinDistance][3]
        let path = [];        
        for(let i = 0; i < minimalNodePath.length; i){
            minimalNodePath.push(this.nodeNumberToCoordinate(minimalNodePath[i]));
        }
        return path;
    }

    nodeNumberToCoordinate(inputNodeNumber: number){
        let xCoord = inputNodeNumber % this.graphWidth;
        let yCoord = Math.floor(inputNodeNumber/ this.graphWidth);
        return new Coordinate(xCoord, yCoord);
      }
    
    coordinateToNodeNumber(inputCoordinate: Coordinate){
        return this.graphWidth * inputCoordinate.getY() + inputCoordinate.getX();
    }

    isNodeWalkable(inputNode: number) {
        let inputCoordinate = this.nodeNumberToCoordinate(inputNode);
        let isWalkable = false;
        this.floorData.walkways.forEach(obj => {
          if (
            inputCoordinate.getX >= obj.topLeft.x &&
            inputCoordinate.getX <= obj.bottomRight.x &&
            inputCoordinate.getY >= obj.topLeft.y &&
            inputCoordinate.getY <= obj.bottomRight.y
          ) {
            isWalkable = true;
          }
        });
        return isWalkable;
      }

      isNodeValid(inputNode: number){
          let inputCoordinate = this.nodeNumberToCoordinate(inputNode);
          return inputCoordinate.getX() >= 0 &&
          inputCoordinate.getX() < this.graphWidth &&
          inputCoordinate.getY() >= 0 &&
          inputCoordinate.getY() < this.graphHeight;
      }

        addToCoordinateQueueNearestWalkableCooordinate(nodeQueue, node, distanceArray){
            if (this.isNodeValid(node) && (this.isNodeWalkable(node))){
                distanceArray[node] = distanceArray[node] + 1;
            }
            else if(this.isNodeValid(node) && !(this.isNodeWalkable(node))){
                nodeQueue.push(node);
            }
        }

        generateAdjacentNodes(inputNode: number){
            let adjacentNodes = new Array();
            adjacentNodes.push(inputNode + 1);
            adjacentNodes.push(inputNode - 1);
            adjacentNodes.push(inputNode + this.graphWidth * this.graphHeight);
            adjacentNodes.push(inputNode - this.graphWidth * this.graphHeight);
            return adjacentNodes;

      }


    initializeAdjacencyMatrix() {
            this.adjacencyMatrix = [];
            for (let i = 0; i < this.graphHeight * this.graphWidth; i++) {
              this.adjacencyMatrix.push(new Array(this.graphHeight * this.graphWidth));
              for (let j = 0; j < this.adjacencyMatrix[i].length; j++) {
                this.adjacencyMatrix[i][j] = 0;
              }
            }
        }         

    fillInAdjacencyMatrix() { 
            for (let i = 0; i < this.adjacencyMatrix.length; i++){ 
              if(this.isNodeWalkable(i)){
                  let adjacentNodes = this.generateAdjacentNodes(i);
                  for(let j = 0; j < adjacentNodes.length; j++){
                      if(this.isNodeWalkable(j)){
                        this.adjacencyMatrix[i][j] = 1;
                      }
                  }
              }
            }
          } 
        
    bfs(startNode:number, endNode: number) { 
        console.log("My start node is: " + startNode);
            
        let distanceArray = [];
        for (let i = 0; i < this.adjacencyMatrix.length; i++) { 
            distanceArray.push(-1);
        }
        distanceArray[startNode] = 0;
        console.log("My Starting Distance Array is:" + distanceArray);
            
        let directionArray: number [][] = [];
        for (let i = 0; i < this.adjacencyMatrix.length; i++) { 
              directionArray[i] = [];
        }
        directionArray[startNode].push(startNode);
        console.log("My Starting Direction Array is:" + directionArray);
        
        let queueOfNodesToVisit = new Array();
        queueOfNodesToVisit.push(startNode);
        console.log("My queue of Nodes to visit is: " + queueOfNodesToVisit);
        
        while (queueOfNodesToVisit.length > 0) {
            //Next node to examine
            let distance = 1;
            let currentNode = queueOfNodesToVisit[0];
            queueOfNodesToVisit.pop();
            console.log("The node I am checking for adjacent nodes:" + currentNode);
            let neighbouringNodes = [];
        
            if (this.adjacencyMatrix[currentNode][currentNode - 1] == 1) {
                neighbouringNodes.push(currentNode - 1);
            }
            if (this.adjacencyMatrix[currentNode][currentNode + 1] == 1) { 
                neighbouringNodes.push(currentNode + 1);
            }
            if (this.adjacencyMatrix[currentNode][currentNode - this.graphWidth]) { 
                neighbouringNodes.push(currentNode - this.graphWidth);
            }
            if (this.adjacencyMatrix[currentNode][currentNode + this.graphWidth]) { 
                neighbouringNodes.push(currentNode + this.graphWidth);
            }
            console.log("Neighbouring Nodes" + neighbouringNodes);
            for (let i = 0; i < neighbouringNodes.length; i++) { 
              if (distanceArray[neighbouringNodes[i]] ==-1) {
                let nodeOfInterest = neighbouringNodes[i];
                console.log("The neighbouring Node is" + nodeOfInterest);
                distanceArray[nodeOfInterest] = distanceArray[currentNode] + 1;
                let currentDirectionArray = Array.from(directionArray[currentNode]);
                console.log("Pre-array" + currentDirectionArray);
                currentDirectionArray.push(nodeOfInterest);
                console.log("Post-array" + currentDirectionArray);
                directionArray[nodeOfInterest] = currentDirectionArray;
                queueOfNodesToVisit.push(neighbouringNodes[i]);
              }
            }
            console.log("My Queue" + queueOfNodesToVisit);
            console.log("My Final Distance array is:" + distanceArray);
            console.log("My Final Direction array" + directionArray);
        }
        
        return [directionArray[endNode], distanceArray[endNode]];
    } 

    getNearestWalkableCoordinate(inputCoordinate: Coordinate){
        let inputNode = this.coordinateToNodeNumber(inputCoordinate);
        let distanceArray = new Array();
        let nodeQueue = new Array();
        let visitedNodeQueue = new Array();
        
        for(let i = 0; i < this.graphHeight * this.graphWidth; i++){
            distanceArray[i] = -1;
        }
        for(let i = 0; i < this.graphHeight * this.graphWidth; i++){
            visitedNodeQueue[i] = 0;
        }
        //InputNode
        distanceArray[inputNode] = 0;
        visitedNodeQueue[inputNode] = 1;
        
        //Generate nodes adjacent to input node
        let adjacentNodes = this.generateAdjacentNodes(inputNode);
        //Evaluate adjacent nodes
        for(let i = 0; i < adjacentNodes.length; i++){
            if(this.isNodeValid(adjacentNodes[i])){
                if(visitedNodeQueue[adjacentNodes[i]] = 0){
                    visitedNodeQueue[adjacentNodes[i]] = 1;
                    distanceArray[adjacentNodes[i]] = distanceArray[inputNode] + 1;
                    if(!this.isNodeWalkable(adjacentNodes[i])){
                        nodeQueue.push(adjacentNodes[i]); 
                    }
                }
            }
        }
        for(let i = 0; i < nodeQueue.length; i++){
            let currentNode = nodeQueue[i]();
            let adjacentNodes = this.generateAdjacentNodes(currentNode); 
            for(let i = 0; i < adjacentNodes.length; i++){
                if(this.isNodeValid(adjacentNodes[i])){
                    if(visitedNodeQueue[adjacentNodes[i]] = 0){
                        visitedNodeQueue[adjacentNodes[i]] = 1;
                        distanceArray[adjacentNodes[i]] = distanceArray[currentNode] + 1;
                        if(!this.isNodeWalkable(adjacentNodes[i])){
                            nodeQueue[length] = adjacentNodes[i]; 
                        }
                    }
                }
            }
        }

        let walkableNodes = [];
        for(let i = 0; i < distanceArray.length; i++){
            if(distanceArray[i] != -1 && this.isNodeWalkable(i)){
                walkableNodes.push([i, distanceArray[i]]);
            }
        }
        return walkableNodes;
    }
      
     

}

export default IndoorFloor;