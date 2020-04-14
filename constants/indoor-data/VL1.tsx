import IndoorFloorData from '../../classes/indoorFloorData';
// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const elevatorData = {
  x: 6,
  y: 19
}
// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const staircaseData = {
  x: 26,
  y: 13
}
// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const bathroomData = [
  {
    x: 10,
    y: 10
  }
]
// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const entranceData =
{
  x: 4,
  y: 28
}

// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const waterFountainsData =
  [{
    x: 11,
    y: 10
  }]
// COV-ID PREVENTS US TO CHECK THAT DATA -- example coordinates
const classRoomsData = [
  {
    classRoom: "VL-115",
    location:
    {
      x: 13,
      y: 9
    }
  },
  {
    classRoom: "VL-129",
    location:
    {
      x: 20,
      y: 4
    }
  }
]
const walkwayData = [
  {
    topLeft: {
      x: 17,
      y: 4,
    },
    bottomRight: {
      x: 18,
      y: 10,
    }
  },
  {
    topLeft: {
      x: 6,
      y: 4,
    },
    bottomRight: {
      x: 23,
      y: 4,
    }
  },
  {
    topLeft: {
      x: 21,
      y: 14,
    },
    bottomRight: {
      x: 27,
      y: 16,
    }
  },
  {
    topLeft: {
      x: 23,
      y: 0,
    },
    bottomRight: {
      x: 23,
      y: 16,
    }
  },
  {
    topLeft: {
      x: 6,
      y: 0,
    },
    bottomRight: {
      x: 23,
      y: 0,
    }
  },
  {
    topLeft: {
      x: 6,
      y: 0,
    },
    bottomRight: {
      x: 6,
      y: 10,
    }
  },
  {
    topLeft: {
      x: 6,
      y: 10,
    },
    bottomRight: {
      x: 14,
      y: 10,
    }
  },
  {
    topLeft: {
      x: 14,
      y: 10,
    },
    bottomRight: {
      x: 20,
      y: 18,
    },
  },
  {
    topLeft: {
      x: 7,
      y: 14,
    },
    bottomRight: {
      x: 16,
      y: 23,
    },
  },
  {
    topLeft: {
      x: 3,
      y: 19,
    },
    bottomRight: {
      x: 7,
      y: 27,
    },
  },
];
const imageWidthPX = 1024;
const imageHeightPX = 1024;
const buildingTitle = 'Vanier Library'; // very important that this matches the marker title

const VL1 = new IndoorFloorData(
  require('../../assets/indoor-floor-plans/VL-1.png'),
  1,
  buildingTitle,
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

export default VL1;
