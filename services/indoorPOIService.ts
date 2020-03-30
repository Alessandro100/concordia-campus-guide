import IndoorPOI from '../classes/indoorPOI';

const IndoorPOIService = {
  indoorPOIs: [],

  clearIndoorPOIs() {
    IndoorPOIService.indoorPOIs = [];
  },

  addIndoorPOI(indoorPOI: IndoorPOI) {
    IndoorPOIService.indoorPOIs.push(indoorPOI);
  },

  getIndoorPOIs(): IndoorPOI[] {
    return IndoorPOIService.indoorPOIs;
  },

  getIndoorPOIbyIdentifier(identifier: string) {
    return IndoorPOIService.getIndoorPOIs().find(poi => poi.getIdentifier() === identifier);
  }
};

export default IndoorPOIService;
