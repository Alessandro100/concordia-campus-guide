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
const Hall8 = new IndoorFloorData(
  require('../../assets/indoor-floor-plans/Hall-8.png'),
  8,
  'Hall',
  imageWidthPX,
  imageHeightPX,
  walkwayData
);

export default Hall8;
