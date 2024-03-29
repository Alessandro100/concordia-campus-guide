import PointOfInterest from "../classes/pointOfInterest";
import OutdoorPOI from "../classes/outdoorPOI";
import Location from "../classes/location";
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import OutdoorUnitPath from '../classes/outdoorUnitPath';
import transportMode from '../classes/transportMode';
import CompoundPath from "../classes/compoundPath";

function createOutdoorUnitPath() {
    const location = new Location(0,0);
    const location2 = new Location(1,2);
    const originPOI = new OutdoorPOI(location, 'test-1');
    const destinationPOI = new OutdoorPOI(location2, 'test-2');
    return new OutdoorUnitPath(transportMode.transit, originPOI, destinationPOI, null, 'blue');
}

describe('Path test suite', () => {
    test('Initialize unit path', () => {
        let unitPath = createOutdoorUnitPath();
        expect(unitPath.getTransportMode()).toEqual(transportMode.transit);
        expect(unitPath.getpathColor()).toEqual('blue');
        expect(unitPath.getEndingLocation()).toEqual(new Location(1,2));
        expect(unitPath.getStartingLocation()).toEqual(new Location(0,0));
        expect(unitPath.getpathGraphic()).toEqual(null)
    });

    test('Init Compound Path', () => {
        let compoundPath = new CompoundPath();
        let unitPath = createOutdoorUnitPath();
        compoundPath.addUnitPath(unitPath);
        expect(compoundPath.getAllPaths().length).toEqual(1);
        compoundPath.removeUnitPath(unitPath);
        expect(compoundPath.getAllPaths().length).toEqual(0);
    })
});