import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import { Svg, Line } from 'react-native-svg';

class IndoorFloor {
    imageUrl: number; //must be passed as require
    imageWidth: number;
    imageHeight: number;
    initialHeightPosition: number;
    initialWidthPosition: number
    floorNumber: number;
    arrayWidth = 30;
    arrayHeight = 30;
    //building: Building

    constructor(imgUrl, imageWidth, imageHeight, floorNumber, initialHeightPosition = 0, initialWidthPosition = 0) {
        this.imageUrl = imgUrl;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.floorNumber = floorNumber;
        this.initialHeightPosition = initialHeightPosition;
        this.initialWidthPosition = initialWidthPosition;
    }

    setInitialWidthPosition(newInitialWidthPosition) {
        this.initialWidthPosition = newInitialWidthPosition;
    }

    setInitialHeightPosition(newInitialHeightPosition) {
        this.initialHeightPosition = newInitialHeightPosition;
    }

    showFloorImage(){
        return(
            <Image
                resizeMode={'cover'}
                style={{width: this.imageWidth, height: this.imageHeight, position: "absolute", top: this.initialHeightPosition, left: this.initialWidthPosition, zIndex: 4}}
                source={this.imageUrl}
            />
        )
    }

    showIndoorTile() {
        let array = [];
        const widthPerTile = this.imageWidth / this.arrayWidth;
        const heightPerTile = this.imageHeight / this.arrayHeight;

        for (let i = 0; i < this.arrayHeight; i++) {
            let yPosition = (i * heightPerTile) + this.initialHeightPosition;
            for (let z = 0; z < this.arrayWidth; z++) {
                let xPosition = z * widthPerTile + this.initialWidthPosition;
                array.push(
                    <View key={i + " " + z} style={{ zIndex: 5, position: 'absolute', top: yPosition, left: xPosition, borderRadius: 2, backgroundColor: 'red', width: widthPerTile, height: heightPerTile, opacity: 0.5 }}>
                    </View>
                )
            }
        }
        return array;
    }

    drawLines(imageHeight, path: [{ x: number, y: number }], widthPerTile, heightPerTile, initialHeight, imageWidth) {
        let lines = []

        for (let pathIndex = 0; pathIndex < path.length - 1; pathIndex++) {
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
                <Svg height={imageHeight} width={imageWidth} style={{ zIndex: 6, top: initialHeight, position: 'absolute' }} origin="0, 0" >
                    <Line x1={startingLocation.xpx} y1={startingLocation.ypx} x2={endingLocation.xpx} y2={endingLocation.ypx} stroke="blue" strokeWidth="2" />
                </Svg>
            )
        }
        return lines;
    }
}

export default IndoorFloor;