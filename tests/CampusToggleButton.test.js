import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import CampusToggleButton from '../components/CampusToggleButton';
import { TouchableHighlight, Text } from 'react-native';
import Campus from '../classes/campus';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Colors from '../constants/Colors';
import Location from '../classes/location';

describe('Sample Test Suite', () => {
  test('CampusToggleButton snapshot', () => {
    const tree = renderer.create(<CampusToggleButton />).toJSON();
    expect(tree).toMatchSnapshot();
  }),
    test('Button Elements Loaded', done => {
      const wrapperRender = render(<CampusToggleButton />);
      const wrapperMount = mount(<CampusToggleButton />);
      expect(wrapperMount.find(TouchableHighlight)).toHaveLength(2);
      expect(wrapperRender.find('[testID="toggle-sgw"]').text()).toEqual('SGW');
      expect(wrapperRender.find('[testID="toggle-loyola"]').text()).toEqual(
        'Loyola'
      );
      done();
    });
  test('Button Style', () => {
    const wrapper = mount(<CampusToggleButton />);
    const instance = wrapper.instance();
    wrapper.setState({ currentCampusView: 'SGW' });
    expect(instance.buttonStyling('Loyola').backgroundColor).toEqual(
      Colors.grey
    );
    wrapper.setState({ currentCampusView: 'Loyola' });
    expect(instance.buttonStyling('Loyola').backgroundColor).toEqual(
      Colors.primaryColor
    );
  });
  test('Toggle Correct', () => {
    const wrapperButton = shallow(
      <CampusToggleButton
        setMapLocation={function setMapLocation(lat, lon) {}}
      />
    );
    wrapperButton.setState({ currentCampusView: 'SGW' });
    wrapperButton
      .find('[testID="toggle-loyola-button"]')
      .props()
      .onPress();
    expect(wrapperButton.state().currentCampusView).toEqual('Loyola');
  });
  test('Campus Object Init', () => {
    const location = new Location(45.4582, -73.6405);
    const campusObject =  new Campus(location, 'Loyola', 'This is the description for the Loyola Campus');
    expect(campusObject.getIdentifier()).toEqual('Loyola');
    expect(campusObject.getLocation().getLatitude()).toEqual(45.4582);
    expect(campusObject.getLocation().getLongitude()).toEqual(-73.6405);
    campusObject.setDescription('new test');
    expect(campusObject.getDescription()).toEqual('new test');
  })
});
