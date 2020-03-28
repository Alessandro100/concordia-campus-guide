import IndoorPOI from '../classes/indoorPOI';

const IndoorPOIService = {
  indoorPOIs: [],

  clearIndoorPOIs() {
    IndoorPOIService.indoorPOIs = [];
  },

  addIndoorPOI(indoorPOI: IndoorPOI) {
    IndoorPOIService.indoorPOIs.push(indoorPOI);
  },

  getIndoorPOIs() {
    return IndoorPOIService.indoorPOIs;
  },
};

export default IndoorPOIService;
