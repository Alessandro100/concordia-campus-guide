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

    graph: Graph;
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
        this.graph = this.indoorFloorFactory.generateGraph();
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
        //Implement breadth first search @Nadia -- graph is initialized
        //Structure of the Node-> key = xIndex-yIndex
        //library used for graph: @dagrejs/graphlib
        //beware of graph cycles 
        //At the end of your algorithm, it should return something like this:
        const fakePath = [
            {x: 5, y: 27},
            {x: 10, y: 27},
            {x: 10, y: 25}
        ];
        return fakePath;
    }
}

export default IndoorFloor;