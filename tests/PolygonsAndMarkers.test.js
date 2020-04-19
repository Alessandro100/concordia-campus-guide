import CampusPolygons from './../constants/CampusPolygons';
import { MarkersSGW, MarkersLoyola } from './../constants/CampusMarkers';
import ShuttleBusMarkers from "../constants/CampusShuttleBusStop";
import { obtainBuildings } from "../services/buildingService";

function getBuildings() {
    return obtainBuildings();
}

function getPolygons() {
    return CampusPolygons.slice(0);
}

function getShuttleBusMarkers() {
    return ShuttleBusMarkers.slice(0);
}

function getMarkersSGW() {
    return MarkersSGW.slice(0);
}

function getMarkersLoyola() {
    return MarkersLoyola.slice(0);
}

describe('Polygons and markers test suite', () => {
    test('Initialize buildings, markers', () => {
        const markersSGW = getMarkersSGW();
        const markersLoyola = getMarkersLoyola();
        const buildings = getBuildings();
        expect(buildings).toHaveLength(49);
        expect(markersLoyola.length).toEqual(18);
        expect(markersSGW.length).toEqual(31);
        expect(markersSGW[0].coordinate.latitude).toEqual(45.497256);
        expect(buildings[10].getIdentifier()).toEqual('VA');
        expect(buildings[48].getIdentifier()).toEqual('JR');
    });
    test('Initialize polygons', () => {
        let polygons = getPolygons();
        expect(polygons).toHaveLength(19);
        expect(JSON.stringify(polygons[0][0])).toEqual(JSON.stringify({ latitude: 45.497159, longitude: -73.579534}));
        expect(JSON.stringify(polygons[10][0])).toEqual(JSON.stringify({ latitude: 45.497981, longitude: -73.579548 }));
        expect(JSON.stringify(polygons[18][0])).toEqual(JSON.stringify({ latitude: 45.459977, longitude: -73.640974 }));
    });

    test('Initialize shuttle bus markers', () => {
        let shuttleBusMarkers = getShuttleBusMarkers();
        expect(shuttleBusMarkers[0].label).toEqual('BUS STOP SGW');
        expect(shuttleBusMarkers[1].label).toEqual('BUS STOP LOYOLA');
        expect(shuttleBusMarkers[0].description).toEqual('Shuttle Bus Stop Location for SGW campus');
        expect(shuttleBusMarkers[1].description).toEqual('Shuttle Bus Stop Location for LOYOLA campus');
    });
});
