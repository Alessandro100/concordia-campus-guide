import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import CampusToggleButton from '../components/CampusToggleButton';
import { TouchableOpacity, Text } from 'react-native';
import transportMode from '../classes/transportMode';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Colors from '../constants/Colors';

describe('Sample Test Suite', () => {
  test('CampusToggleButton snapshot', () => {
    const tree = renderer.create(<CampusToggleButton />).toJSON();
    expect(tree).toMatchSnapshot();
  }),
    test('Button Elements Loaded', done => {
      const wrapperRender = render(<CampusToggleButton />);
      const wrapperMount = mount(<CampusToggleButton />);
      expect(wrapperMount.find(TouchableOpacity)).toHaveLength(2);
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
});
