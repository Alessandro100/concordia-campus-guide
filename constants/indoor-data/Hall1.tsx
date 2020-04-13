import IndoorFloorData from "../../classes/indoorFloorData";

const elevatorData = {
    x: 19,
    y: 23
}
const staircaseData = {
    x: 17,
    y: 26
}
const bathroomData = [
    
       {
            x: 14,
            y: 20
        },
         {
            x: 14,
            y: 19
        }
    
]

const entranceData = 
    {
        x: 11,
        y: 29
    }


const waterFountainsData =
[{
    x: 14,
    y: 22
}]

const classRoomsData = [
    {
        classRoom: "H-110",
        location:
        {
            x: 7,
            y: 24
        }
    }
]

const walkwayData = [
    {
        topLeft: {
            x: 1,
            y: 24
        },
        bottomRight: {
            x: 16,
            y: 29
        }
    },
    {
        topLeft: {
            x: 16,
            y: 28
        },
        bottomRight: {
            x: 27,
            y: 29
        }
    },
    {
        topLeft: {
            x: 15,
            y: 19
        },
        bottomRight: {
            x: 16,
            y: 24
        }
    },
    {
        topLeft: {
            x: 17,
            y: 22
        },
        bottomRight: {
            x: 24,
            y: 22
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

const Hall1 = new IndoorFloorData(require(imageURL), 1, 'Hall', imageWidthPX, imageHeightPX, elevatorData, walkwayData, staircaseData, bathroomData, entranceData, waterFountainsData, classRoomsData);

export default Hall1;