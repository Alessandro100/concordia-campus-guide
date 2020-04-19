import React from 'react';
import { View, Image, ImageStyle, ViewStyle } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import { Graph } from '@dagrejs/graphlib';
import IndoorFloorFactory from './indoorFloorFactory';
import Coordinate from './coordinate';
import IndoorFloorData from './indoorFloorData'
import Building from './building';

// save the different indoor POI logos in const variables
const waterFountainIcon = require('../assets/indoor-floor-plans/waterfountain.png')
const toiletIcon = require('../assets/indoor-floor-plans/toilet.png')
const staircaseIcon = require('../assets/indoor-floor-plans/staircase.png')
const elevatorIcon = require('../assets/indoor-floor-plans/elevator.png')

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

    constructor(building: Building, floorData: IndoorFloorData) {
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

    setImageWidth(newImageWidth: number) {
        this.imageWidth = newImageWidth;
        const ratio = this.floorData.imageWidthPX / this.floorData.imageHeightPX;
        this.imageHeight = newImageWidth * ratio;
    }

    setFloorImageStyle(): ImageStyle {
        return {
            width: this.imageWidth, height: this.imageHeight, position: "absolute", top: this.initialHeightPosition, left: this.initialWidthPosition, zIndex: 4
        }
    }

    showFloorImage() {
        return (
            <Image
                resizeMode={'cover'}
                style={this.setFloorImageStyle()}
                source={this.floorData.floorImage}
            />
        )
    }

    // This function has been commented out because it's out of use. It could be useful when updating the infloormap data in the future though
    // Concerning the walkables paths
    getWalkwayTileColor(xIndex, yIndex) {
        let color = 'red';
        this.floorData.walkways.forEach(obj => {
            if (xIndex >= obj.topLeft.x && xIndex <= obj.bottomRight.x && yIndex >= obj.topLeft.y && yIndex <= obj.bottomRight.y) {
                color = 'blue';
            }
        })
        if (this.floorData.entrance && xIndex === this.floorData.entrance.x && yIndex === this.floorData.entrance.y) {
            color = 'white'
        }
        if (this.floorData.elevator && xIndex === this.floorData.elevator.x && yIndex === this.floorData.elevator.y) {
            color = 'black'
        }
        if (this.floorData.bathrooms) {
            this.floorData.bathrooms.forEach(bathroom => {
                if (xIndex === bathroom.x && yIndex === bathroom.y) {
                    color = 'yellow'
                }
            })
        }
        if (this.floorData.waterFountains) {
            this.floorData.waterFountains.forEach(waterFountain => {
                if (xIndex === waterFountain.x && yIndex === waterFountain.y) {
                    color = 'purple'
                }
            })
        }
        if (this.floorData.classRooms) {
            this.floorData.classRooms.forEach(classRoom => {
                if (xIndex === classRoom.location.x && yIndex === classRoom.location.y) {
                    color = 'orange'
                }
            })
        }
        return color;
    }

    // this function returns proper styles for the icons
    setLogoStyle = (xPosition, yPosition, type): ImageStyle => {
        let styles: ImageStyle = { zIndex: 7, position: "absolute" , top: yPosition, left: xPosition, opacity: 1, }

        switch (type) {
            case 'toilet':
                styles['borderRadius'] = 25 / 2;
                /* falls through */
            case 'elevator':
            case 'staircase':
                styles['width'] = 25;
                styles['height'] = 25;
                break;
            case 'waterfountain':
                styles['borderRadius'] = 23 / 2;
                styles['width'] = 23;
                styles['height'] = 23;
                break;
            default: break;
        }

        return styles
    }

    // this function is called when a set of coordina  i - z return a match with the TYPE of indoor poit
    // this function returns an image (logo) of the specified indoor poi
    // function is called in showIndoorTile()
    // this function calls setLogoStyle to apply the correct style to each type of icon
    setIndoorPOIIcon(i, z, xPosition, yPosition, type) {
        let icon = null

        switch (type) {
            case 'toilet':
                icon = toiletIcon;
                break;
            case 'waterfountain':
                icon = waterFountainIcon;
                break;
            case 'staircase':
                icon = staircaseIcon;
                break;
            case 'elevator':
                icon = elevatorIcon;
                break;
            default: break;
        }
        // Creates an image with the right icon and according style
        const img = <Image
            source={icon}
            key={i + " " + z}
            style={this.setLogoStyle(xPosition, yPosition, type)}
        />

        return img
    }

    setViewStyle = (xPosition, yPosition, widthPerTile, heightPerTile): ViewStyle => {
        return {
            zIndex: 5,
            position: 'absolute',
            top: yPosition,
            left: xPosition,
            borderRadius: 2,
            width: widthPerTile,
            height: heightPerTile,
            opacity: 0.5
        }
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
                        style={this.setViewStyle(xPosition, yPosition, widthPerTile, heightPerTile)}>
                    </View>
                )
                // This section goes through the bathrooms coordinates
                // Then proceeds to call the setIndoorPOIIcon when a match is given
                this.floorData.bathrooms.forEach(bathroom => {
                    if (z === bathroom.x && i === bathroom.y) {
                        array.push(
                            this.setIndoorPOIIcon(i, z, xPosition, yPosition, 'toilet')
                        )
                    }
                })
                // This section goes through the waterfountain coordinates
                // Then proceeds to call the setIndoorPOIIcon when a match is given
                this.floorData.waterFountains.forEach(waterfountain => {
                    if (z === waterfountain.x && i === waterfountain.y) {
                        array.push(
                            this.setIndoorPOIIcon(i, z, xPosition, yPosition, 'waterfountain')
                        )
                    }
                })
                // This section checks the elevator coordinates
                // Then proceeds to call the setIndoorPOIIcon if a match is given
                if (this.floorData.elevator && z === this.floorData.elevator.x && i === this.floorData.elevator.y) {
                    array.push(
                        this.setIndoorPOIIcon(i, z, xPosition, yPosition, 'elevator')
                    )
                }
                // This section checks the staircase coordinates
                // Then proceeds to call the setIndoorPOIIcon if a match is given
                if (this.floorData.staircase && z === this.floorData.staircase.x && i === this.floorData.staircase.y) {
                    array.push(
                        this.setIndoorPOIIcon(i, z, xPosition, yPosition, 'staircase')
                    )
                }
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
        const startKey = startingNode.x + '-' + startingNode.y;
        const endKey = endingNode.x + '-' + endingNode.y;
        const pathArray = this.shortestPath(startKey, endKey);
        //const pathArray = this.shortestPath('5-27', '8-26'); A way to test

        let coordPath = []
        pathArray.forEach(key => {
            const value = key.split('-');
            coordPath.push({ x: value[0], y: value[1] })
        });

        return coordPath;
    }

    bfs(start) {
        if (!this.graph.neighbors(start) || !this.graph.neighbors(start).length) {
            return [start]
        }

        var results = { "nodes": [] },
            queue = this.graph.neighbors(start),
            count = 1

        while (queue.length) {
            var node = queue.shift()
            if (!results[node] || !results[node].visited) {
                results[node] = { visited: true, steps: count }
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

        while (tail < queue.length) {
            var u = queue[tail++]
            if (!this.graph.neighbors(u)) {
                continue
            }

            var neighbors = this.graph.neighbors(u)
            for (var i = 0; i < neighbors.length; ++i) {
                var v = neighbors[i]
                if (visited[v]) {
                    continue
                }
                visited[v] = true
                if (v === end) {   // Check if the path is complete.
                    path = [v]   // If so, backtrack through the path.
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