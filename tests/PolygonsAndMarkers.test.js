import CampusPolygons from './../constants/CampusPolygons';
import { MarkersSGW, MarkersLoyola } from './../constants/CampusMarkers';
import ShuttleBusMarkers from "../constants/CampusShuttleBusStop";
import {obtainBuildings} from "../services/BuildingService";

function getBuildings() {
    return obtainBuildings();
}
//
// function getPolygons() {
//     return CampusPolygons.slice(0);
// }
//
// function getShuttleBusMarkers() {
//     return ShuttleBusMarkers.slice(0);
// }

describe('Polygons and markers test suite', () => {
    test('Initialize buildings', () => {
        const markersSGW = MarkersSGW.slice(0);
        console.log(markersSGW[0]);
        //expect(buildings).toHaveLength(49);
        expect(markersSGW[0].coordinate.latitude).toEqual(45.497256);
        // expect(buildings[10].label).toEqual('VA');
        // expect(buildings[48].label).toEqual('JR');
    });

    // test('Initialize polygons', () => {
    //     let polygons = getPolygons();
    //     expect(polygons).toHaveLength(19);
    //     expect(JSON.stringify(polygons[0][0])).toEqual(JSON.stringify({ latitude: 45.497159, longitude: -73.579534}));
    //     expect(JSON.stringify(polygons[10][0])).toEqual(JSON.stringify({ latitude: 45.497981, longitude: -73.579548 }));
    //     expect(JSON.stringify(polygons[18][0])).toEqual(JSON.stringify({ latitude: 45.459977, longitude: -73.640974 }));
    // })
    //
    // test('Initialize shuttle bus markers', () => {
    //     let shuttleBusMarkers = getShuttleBusMarkers();
    //     expect(shuttleBusMarkers[0].label).toEqual('BUS STOP SGW');
    //     expect(shuttleBusMarkers[1].label).toEqual('BUS STOP LOYOLA');
    //     expect(shuttleBusMarkers[0].description).toEqual('Shuttle Bus Stop Location for SGW campus');
    //     expect(shuttleBusMarkers[1].description).toEqual('Shuttle Bus Stop Location for LOYOLA campus');
    // })
});
