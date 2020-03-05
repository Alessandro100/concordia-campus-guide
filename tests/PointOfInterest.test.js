import PointOfInterest from "../classes/pointOfInterest";
import OutdoorPOI from "../classes/outdoorPOI";
import Location from "../classes/location";
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

describe('POI test suite', () => {
    test('Initialize Point of interes', () => {
        
        const poi = new PointOfInterest('test-1');
        expect(poi.getIdentifier()).toEqual('test-1');
        poi.setLongitude('test-1-1')
        expect(poi.getIdentifier()).toEqual('test-1-1');
    });

    test('OutdoorPOI set location', () => {
        const testLocation = new Location(45.458488, -73.639862);
        const outdoorPOI = new OutdoorPOI(testLocation, 'test-2');
        outdoorPOI.setLocation(new Location(45.50349, -73.572182));
        expect(outdoorPOI.getLocation()).toEqual(new Location(45.50349, -73.572182));
    })
});