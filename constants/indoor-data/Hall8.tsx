import IndoorFloorData from '../../classes/indoorFloorData';

const entranceData = {
  x: 0,
  y: 0
}
const elevatorData = {
  x: 7,
  y: 11
}
const staircaseData = {
  x: 14,
  y: 18
}
const bathroomData = [
  
    {
      x: 12,
      y: 7
    },
    {
      x: 18,
      y: 7
    }
  
]

const waterFountainsData =
[{
  x: 19,
  y: 7
}]

const classRoomsData = [
  {
    classRoom: "H-813",
    location:
    {
      x: 4,
      y: 14
    }
  },
  {
    classRoom: "H-857",
    location:
    {
      x: 24,
      y: 17
    }
  },
  {
    classRoom: "H-832",
    location:
    {
      x: 18,
      y: 5
    }
  }
]

const walkwayData = [

  {
    topLeft: {
      x: 15,
      y: 2,
    },
    bottomRight: {
      x: 16,
      y: 28,
    },
  },
  {
    topLeft: {
      x: 4,
      y: 11,
    },
    bottomRight: {
      x: 16,
      y: 11,
    },
  },
  {
    topLeft: {
      x: 4,
      y: 23,
    },
    bottomRight: {
      x: 24,
      y: 23,
    },
  },
  {
    topLeft: {
      x: 24,
      y: 6,
    },
    bottomRight: {
      x: 24,
      y: 23,
    },
  },
  {
    topLeft: {
      x: 4,
      y: 6,
    },
    bottomRight: {
      x: 24,
      y: 6,
    },
  },
  {
    topLeft: {
      x: 4,
      y: 6,
    },
    bottomRight: {
      x: 5,
      y: 23,
    },
  },
];
const imageWidthPX = 1024;
const imageHeightPX = 1024;

const Hall8 = new IndoorFloorData(
  require('../../assets/indoor-floor-plans/Hall-8.png'),
  8,
  'Hall',
  imageWidthPX,
  imageHeightPX,
  elevatorData,
  walkwayData,
  staircaseData,
  bathroomData,
  entranceData,
  waterFountainsData,
  classRoomsData

);

export default Hall8;
