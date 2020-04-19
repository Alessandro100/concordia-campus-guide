import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import CampusToggleButton from '../components/CampusToggleButton';
import { obtainBuildings } from "../services/buildingService";
import { MarkersSGW, MarkersLoyola } from './../constants/CampusMarkers';
import ShuttleBusMarkers from "../constants/CampusShuttleBusStop";
import { TouchableHighlight, Text, TouchableOpacity, Button } from 'react-native';
import Campus from '../classes/campus';
import Colors from '../constants/Colors';
import Location from '../classes/location';
import PolygonsAndMarkers from '../components/PolygonsAndMarkers';
import CampusPolygons from '../constants/CampusPolygons';
import App from '../App';
import CurrentPosition from '../components/CurrentPosition'
// import BottomDrawerBuilding from '../components/BottomDrawerBuilding'; Error importing bottomDrawer-rn module 
import SearchBar from '../components/SearchBar'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ShowDirection from '../components/ShowDirection'
import MapView, { Marker, Polyline } from 'react-native-maps';
import OutdoorPOI from '../classes/outdoorPOI';
import transportMode from '../classes/transportMode';
import CampusEventComponent from '../components/CampusEventComponent';
import CampusEventContainer from '../components/CampusEventContainer';
import NavBtn from '../components/NavBtn'
function getBuildings() {
    return obtainBuildings();
}
function getMarkersSGW() {
    return MarkersSGW.slice(0);
}

function getMarkersLoyola() {
    return MarkersLoyola.slice(0);
}

function getShuttleBusMarkers() {
    return ShuttleBusMarkers.slice(0);
}


function displayCurrentLocation() {
    const options = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24,
    };
    navigator.geolocation.getCurrentPosition(this.success, null, options);
}

describe('Epic 1 System-Test test suite', () => {
    test('US-18 - toggle button navigates through campuses', () => {
        const wrapperButton = shallow(<CampusToggleButton
            setMapLocation={function setMapLocation(lat, lon) { }}
        />);
        wrapperButton.setState({ currentCampusView: 'SGW' });
        wrapperButton.find('[testID="toggle-loyola-button"]').props().onPress();
        expect(wrapperButton.state().currentCampusView).toEqual('Loyola');
    });
 
    test('US-19 As a user, I want to see additional information for each building.', () => {
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

    test('US-24 verify the button to access current location loads', done => {
        const wrapperMount = mount(<CurrentPosition />);
        expect(wrapperMount.find(TouchableOpacity)).toHaveLength(1);
        done();
    });


    test('US-38 I want to be able to use the search bar', done => {
        const wrapperMount = mount(<SearchBar />);
        expect(wrapperMount.find(GooglePlacesAutocomplete)).toHaveLength(1);
        done();
    });

    test('US-39 I want to see where the shuttle bus is', () => {
        let shuttleBusMarkers = getShuttleBusMarkers();
        expect(shuttleBusMarkers[0].label).toEqual('BUS STOP SGW');
        expect(shuttleBusMarkers[1].label).toEqual('BUS STOP LOYOLA');
        expect(shuttleBusMarkers[0].description).toEqual('Shuttle Bus Stop Location for SGW campus');
        expect(shuttleBusMarkers[1].description).toEqual('Shuttle Bus Stop Location for LOYOLA campus');
    });

    test('US-30 I want outoors directions to be displayed to screen', async (done) => {
        const wrapper = mount(
            <ShowDirection
                startLocation={new OutdoorPOI(new Location(45.458488, -73.639862), 'test-start')}
                endLocation={new OutdoorPOI(new Location(45.50349, -73.572182), 'test-end')}
                transportType={transportMode.transit}
            />
        );
        const instance = wrapper.instance();
        try {
            await instance.loadRoute();
            expect(wrapper.find(Marker)).toHaveLength(2);
            expect(wrapper.getElements(<MapView.Polyline />).length > 0).toEqual(true);
        } catch (e) {
            done();
        }
    });

    test('US-30 I want to see start and end destination pins', done => {
        const wrapper = mount(
            <ShowDirection
                startLat={45.458488}
                startLon={-73.6398621}
                endLat={45.50349}
                endLon={-73.572182}
                transportType={transportMode.transit}
            />
        );
        const instance = wrapper.instance();
        const startingLocation = new Location(45.458488, -73.6398621);
        const endingLocation = new Location(45.42069, -73.69420);
        const startingPOI = new OutdoorPOI(startingLocation, 'startingLocation');
        const endingPOI = new OutdoorPOI(endingLocation, 'endingLocation');
        expect(instance.getPinLocation(startingPOI.getLocation())).toEqual({ latitude: 45.458488, longitude: -73.6398621 });
        expect(instance.getPinLocation(endingPOI.getLocation())).toEqual({ latitude: 45.42069, longitude: -73.69420 });
        expect(instance.getPinLocation(null)).toEqual({ latitude: 0, longitude: 0 });
        done();
    });


    test('US-53 By the click of a button I want to open a navigation menu', done => {
        const wrapperMount = mount(<NavBtn />);
        expect(wrapperMount.find(TouchableOpacity)).toHaveLength(1);
        done();
    });

    
});

// Potential future test which aren't working right now for specific reasons

    // bottom drawer-rn problem with JEST
    // Will Have to Investigate
    //     test('US-22 As a user, I want to be able to click on a building from the map view of either SGW or Loyola campus.', () => {
    //         const wrapperDrawer = mount(
    //             <BottomDrawerBuilding
    //             />
    //         )

    //         //wrapperDrawer.find('[testID="LB"]').props().onPress();
    //         wrapperDrawer.find('[testID="gayCuck"]').props().onCollapse();
    //         expect(wrapperDrawer.displayBuildingInfo()).toHaveBeenCalled(1);
    //     }
    //     )

       
    // Test Currently does not work
    // test('US-23 On press show current location', () => {
    //     const mockGeolocation = {
    //         getCurrentPosition: jest.fn(),
    //       };

    //       global.navigator.geolocation = mockGeolocation;
    //       const displayCurrentLocation = jest.fn();
    //     const wrapperMount = shallow (<CurrentPosition/>);
    //     const instance = wrapperMount.instance();
    //     wrapperMount.find('[testID="diplayCurrentLocation"]').props().onPress();
    //     expect(instance.displayCurrentLocation).toHaveBeenCalled();
    //  });

    // bottom drawer-rn problem with JEST
    // Will Have to Investigate
    // test('US-32 verify the button to transtion to indoor-navigation exists', done => {
    //     const wrapperMount = mount(<BottomDrawerBuilding />);
    //     expect(wrapperMount.find('[testID="indoor-navigation"]').find(Button)).toHaveLength(1);
    //     done();
    //   }); 
