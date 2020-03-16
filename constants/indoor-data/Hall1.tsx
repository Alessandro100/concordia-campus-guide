import IndoorFloorData from "../../classes/indoorFloorData";

const walkwayData = [
    {
        topLeft: {
            x: 1,
            y: 24
        },
        bottomRight: {
            x: 16,
            y: 28
        }
    },
    {
        topLeft: {
            x: 17,
            y: 26
        },
        bottomRight: {
            x: 19,
            y: 28
        }
    },
    {
        topLeft: {
            x: 19,
            y: 25
        },
        bottomRight: {
            x: 27,
            y: 27
        }
    },
    {
        topLeft: {
            x: 24,
            y: 21
        },
        bottomRight: {
            x: 25,
            y: 25
        }
    }
]
const imageURL = '../../assets/indoor-floor-plans/Hall-1.png';
const imageWidthPX = 2643;
const imageHeightPX = 2823;
const Hall1 = new IndoorFloorData(require(imageURL), 1, 'Hall', imageWidthPX, imageHeightPX, walkwayData);

export default Hall1;