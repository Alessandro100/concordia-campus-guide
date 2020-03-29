import React from 'react';
import { View, Image } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import { Graph } from '@dagrejs/graphlib';
import IndoorFloorFactory from './indoorFloorFactory';
import Coordinate from './coordinate';
import IndoorFloorData from './indoorFloorData'
import Building from './building';

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
        if(this.floorData.entrance && xIndex === this.floorData.entrance.x && yIndex === this.floorData.entrance.y) {
            color = 'white'
        }
        if(this.floorData.elevator && xIndex === this.floorData.elevator.x && yIndex === this.floorData.elevator.y) {
            color = 'black'
        }
        if(this.floorData.bathrooms) {
            this.floorData.bathrooms.forEach(bathroom =>{
                if(xIndex === bathroom.x && yIndex === bathroom.y) {
                    color = 'yellow'
                }
            })
        }
        if(this.floorData.waterFountains) {
            this.floorData.waterFountains.forEach(waterFountain =>{
                if(xIndex === waterFountain.x && yIndex === waterFountain.y) {
                    color = 'purple'
                }
            })
        }
        if(this.floorData.classRooms) {
            this.floorData.classRooms.forEach(classRoom =>{
                if(xIndex === classRoom.location.x && yIndex === classRoom.location.y) {
                    color = 'orange'
                }
            })
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
                    <Line x1={startingLocation.xpx} y1={startingLocation.ypx} x2={endingLocation.xpx} y2={endingLocation.ypx} stroke="red" strokeWidth="2" />
                </Svg>
            )
        }
        return lines;
    }

    //returns the data on how to get from one tile to another
    getPath(startingNode: Coordinate, endingNode: Coordinate): Coordinate[] {
        const startKey = startingNode.x +'-' + startingNode.y;
        const endKey = endingNode.x + '-' + endingNode.y;
        let pathArray = this.shortestPath('11-29', '19-23');
        //const pathArray = this.shortestPath(startKey, endKey);

        let coordPath = []
        pathArray.forEach(key =>{
            const value = key.split('-');
            coordPath.push({x: value[0], y: value[1]})
        });

        return coordPath;
    }
    
    bfs(start) {
        if (!this.graph.neighbors(start) || !this.graph.neighbors(start).length) {
          return [start]
        }
    
        var results = {"nodes": []},
            queue = this.graph.neighbors(start),
            count = 1
    
        while(queue.length) {
          var node = queue.shift()
          if (!results[node] || !results[node].visited) {
            results[node] = {visited: true, steps: count}
            results["nodes"].push(node)
            if (this.graph.neighbors[node]) {
              if (this.graph.neighbors[node].length) {
                count++
                queue.push(...this.graph.neighbors[node])
              } else {
                continue
              }
            }
          }
        }
        return results
    }
    
      shortestPath(start, end) {
        if (start == end) {
          return [start, end]
        }
    
        var queue = [start],
            visited = {},
            predecessor = {},
            tail = 0,
            path
    
        while(tail < queue.length) {
          var u = queue[tail++]
          if (!this.graph.neighbors(u)) {
            continue
          }
    
          var neighbors = this.graph.neighbors(u)
          for(var i = 0; i < neighbors.length; ++i) {
            var v = neighbors[i]
            if (visited[v]) {
              continue
            }
            visited[v] = true
            if (v === end) {   // Check if the path is complete.
              path = [ v ]   // If so, backtrack through the path.
              while (u !== start) {
                path.push(u)
                u = predecessor[u]
              }
              path.push(u)
              path.reverse()
              return path
            }
            predecessor[v] = u
            queue.push(v)
          }
        }
        return path
      }
}

export default IndoorFloor;