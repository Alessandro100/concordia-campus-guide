import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import CampusToggleButton from '../components/CampusToggleButton';
import { obtainBuildings } from "../services/BuildingService";
import { MarkersSGW, MarkersLoyola } from './../constants/CampusMarkers';
import { TouchableHighlight, Text } from 'react-native';
import Campus from '../classes/campus';
import Colors from '../constants/Colors';
import Location from '../classes/location';
import MapView from '../App';
import PolygonsAndMarkers from '../components/PolygonsAndMarkers';
import CampusPolygons from '../constants/CampusPolygons';
import App from '../App';

function getBuildings() {
    return obtainBuildings();
}
function getMarkersSGW() {
    return MarkersSGW.slice(0);
}

function getMarkersLoyola() {
    return MarkersLoyola.slice(0);
}

describe('Epic 1 System Test test suite', () => {
    test('US-18 - toggle button navigates through campuses', () => {
        const wrapperButton = shallow(<CampusToggleButton
            setMapLocation={function setMapLocation(lat, lon) { }}
        />);
        wrapperButton.setState({currentCampusView: 'SGW'});
        wrapperButton.find('[testID="toggle-loyola-button"]').props().onPress();
        expect(wrapperButton.state().currentCampusView).toEqual('Loyola');
    });
    
    test('US-19 Clicking building gives description', () => {
        const buildings = obtainBuildings();
        const polygons = CampusPolygons.slice(0);

        const wrapperBuilding = shallow(
            <PolygonsAndMarkers
                buildings={buildings}
                polygons={polygons}
                displaybuilding={displayBuildingInfo = (building, displayInfo) => {
                    expect(building.identifier).toEqual('LB')
                    expect(displayInfo).toEqual(true)
                }}
            />
        )
        wrapperBuilding.find('[testID="LB"]').props().onPress();
    });
});
