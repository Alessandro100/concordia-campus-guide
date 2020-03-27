import IndoorFloorData from '../../classes/indoorFloorData';

const walkwayData = [
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
const buildingTitle = 'Vanier Library'; // very important that this matches the marker title
const VL1 = new IndoorFloorData(
  require('../../assets/indoor-floor-plans/VL-1.png'),
  1,
  buildingTitle,
  imageWidthPX,
  imageHeightPX,
  walkwayData
);

export default VL1;
