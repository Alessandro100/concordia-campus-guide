import CampusPolygons from './../constants/CampusPolygons';
import CampusMarkers from './../constants/CampusMarkers';
import ShuttleBusMarkers from "../constants/CampusShuttleBusStop";

function getMarkers() {
    return CampusMarkers.slice(0);
}

function getPolygons() {
    return CampusPolygons.slice(0);
}

function getShuttleBusMarkers() {
    return ShuttleBusMarkers.slice(0);
}

describe('Polygons and markers test suite', () => {
    test('Initialize markers', () => {
        let markers = getMarkers();
        expect(markers).toHaveLength(49);
        expect(markers[0].label).toEqual('H');
        expect(markers[10].label).toEqual('VA');
        expect(markers[48].label).toEqual('JR');
    });

    test('Initialize polygons', () => {
        let polygons = getPolygons();
        expect(polygons).toHaveLength(19);
        expect(JSON.stringify(polygons[0][0])).toEqual(JSON.stringify({ latitude: 45.497159, longitude: -73.579534}));
        expect(JSON.stringify(polygons[10][0])).toEqual(JSON.stringify({ latitude: 45.497981, longitude: -73.579548 }));
        expect(JSON.stringify(polygons[18][0])).toEqual(JSON.stringify({ latitude: 45.459977, longitude: -73.640974 }));
    })

    test('Initialize shuttle bus markers', () => {
        let shuttleBusMarkers = getShuttleBusMarkers();
        expect(shuttleBusMarkers[0].label).toEqual('BUS STOP SGW');
        expect(shuttleBusMarkers[1].label).toEqual('BUS STOP LOYOLA');
        expect(shuttleBusMarkers[0].description).toEqual('Shuttle Bus Stop Location for SGW campus');
        expect(shuttleBusMarkers[1].description).toEqual('Shuttle Bus Stop Location for LOYOLA campus');
    })
});
