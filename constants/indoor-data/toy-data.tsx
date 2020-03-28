import IndoorFloorData from "../../classes/indoorFloorData";

const walkwayData = [
    {
        topLeft: {
            x: 5,
            y: 0
        },
        bottomRight: {
            x: 9,
            y: 0
        }
    },
    {
        topLeft: {
            x: 1,
            y: 1
        },
        bottomRight: {
            x: 5,
            y: 2
        }
    },
    {
        topLeft: {
            x: 4,
            y: 3
        },
        bottomRight: {
            x: 5,
            y: 3
        }
    },
    {
        topLeft: {
            x: 3,
            y: 5
        },
        bottomRight: {
            x: 4,
            y: 8
        }
    },
    {
        topLeft: {
            x: 0,
            y: 7
        },
        bottomRight: {
            x: 5,
            y: 7
        }
    },
    {
        topLeft: {
            x: 5,
            y: 8
        },
        bottomRight: {
            x: 8,
            y: 8
        }
    },
    {
        topLeft: {
            x: 5,
            y: 9
        },
        bottomRight: {
            x: 8,
            y: 9
        }
    }
]
const imageURL = '../../assets/indoor-floor-plans/Hall-1.png';
const imageWidthPX = 2643;
const imageHeightPX = 2823;
const ToyData = new IndoorFloorData(require(imageURL), 1, 'ToyData', imageWidthPX, imageHeightPX, walkwayData);

export default ToyData;