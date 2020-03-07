import PointOfInterest from "../classes/pointOfInterest";
import OutdoorPOI from "../classes/outdoorPOI";
import Location from "../classes/location";
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import UnitPath from '../classes/unitPath';
import transportMode from '../classes/transportMode';
import CompoundPath from "../classes/compoundPath";

function createUnitPath() {
    const originPOI = new PointOfInterest('test-1');
    const destinationPOI = new PointOfInterest('test-2');
    return new UnitPath(transportMode.transit, originPOI, destinationPOI, null, 'blue');
}

describe('Path test suite', () => {
    test('Initialize unit path', () => {
        let unitPath = createUnitPath();
        expect(unitPath.getTransportMode()).toEqual(transportMode.transit);
        expect(unitPath.getpathColor()).toEqual('blue');
        expect(unitPath.getEndingLocation()).toEqual(new Location(0,0));
        expect(unitPath.getStartingLocation()).toEqual(new Location(0,0));
        expect(unitPath.getpathGraphic()).toEqual(null)
    });

    test('Init Compound Path', () => {
        let compoundPath = new CompoundPath();
        let unitPath = createUnitPath();
        compoundPath.addUnitPath(unitPath);
        expect(compoundPath.getAllPaths().length).toEqual(1);
        compoundPath.removeUnitPath(unitPath);
        expect(compoundPath.getAllPaths().length).toEqual(0);
    })
});