import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import ShowDirection from '../components/ShowDirection';
import transportMode from '../classes/transportMode';
import MapView, { Marker, Polyline } from 'react-native-maps';

describe('Get Directions Suite', () => {
  test('ShowDirection snapshot', () => {
    const tree = renderer
      .create(<ShowDirection />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  }),
  test('Map Elements Loaded', done => {
    const wrapper = mount(
      <ShowDirection
        startLat={45.458488}
        startLon={-73.6398621}
        endLat={45.50349}
        endLon={-73.572182}
        transportType={transportMode.transit}
      />
    );
    expect(wrapper.find(Marker)).toHaveLength(2);
    expect(wrapper.getElements(<MapView.Polyline />).length > 0).toEqual(true);
    done();
  });
  test('Step Functions', done => {
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
    const step = {
      travel_mode: 'TRANSIT',
      end_location: {
        lat: 45.458488,
        lng: -73.6398621
      },
      transit_details: {
        line: {
          color: 'blue'
        }
      }
    }
    expect(instance.getPolylineColor(step)).toEqual('blue');
    expect(instance.getPinLocation(step)).toEqual({ latitude: 45.458488, longitude: -73.6398621 });
    expect(instance.getPinLocation(null)).toEqual({ latitude: 0, longitude: 0 });
    done();
  })
});