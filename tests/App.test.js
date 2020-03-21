import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import CampusToggleButton from '../components/CampusToggleButton';

describe('Sample Test Suite', () => {
  test('Sample Test Case', () => {
    expect(true).toEqual(true);
  }),
  test('Sample Snapshot Test', () => {
    const tree = renderer
      .create(<CampusToggleButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  }),
  test('Sample Enzyme Test', () => {
    const wrapper = render(<CampusToggleButton />);
    expect(wrapper.find('[testID="toggle-sgw"]').text()).toEqual("SGW");
    expect(wrapper.find('[testID="toggle-loyola"]').text()).toEqual("Loyola");
  });
  test('Sample Enzyme Test Current Location button', () => {
    const wrapperMount = mount(<App/>);
    expect(wrapperMount.find(TouchableHighlight)).toHaveLength(1);
    expect(wrapperMount.find(Image)).toHaveLength(1);
  })
});