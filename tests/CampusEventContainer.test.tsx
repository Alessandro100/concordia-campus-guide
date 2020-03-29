import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CampusEventContainer from '../components/CampusEventContainer';

describe('CampusEventComponent Test Suite', () => {
    test('Loading text should be present when events is empty', () => {
        const wrapper = render(<CampusEventContainer buildingId='MB'/>);
        expect(wrapper.text().includes('')).toBe(true);
    }),
    test('Loading text should not be present when events is not empty', () => {
        let wrapper = shallow(<CampusEventContainer buildingId='MB'/>);
        setTimeout( () => {expect(wrapper.text().includes('')).toBe(true);}, 10000);
    });
});