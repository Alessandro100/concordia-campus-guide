import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import ShowDirection from '../components/ShowDirection';
import transportMode from '../classes/transportMode';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Location from '../classes/location';
import OutdoorPOI from '../classes/outdoorPOI';

describe('Get Directions Suite', () => {
  test('ShowDirection snapshot', () => {
    const tree = renderer
      .create(<ShowDirection />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Map Elements Loaded', async (done) => {
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
  test('Pin Location', done => {
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
    const startingPOI = new OutdoorPOI(startingLocation, 'startingLocation');
    expect(instance.getPinLocation(startingPOI.getLocation())).toEqual({ latitude: 45.458488, longitude: -73.6398621 });
    expect(instance.getPinLocation(null)).toEqual({ latitude: 0, longitude: 0 });
    done();
  });
});
