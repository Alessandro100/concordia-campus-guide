import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CampusEventComponent from '../components/CampusEventComponent';
import CampusEvent from '../classes/CampusEvent';

describe('CampusEventComponent Test Suite', () => {
    const title: string = 'testTitle';
    const description: string = 'testDescription';
    const startDate: Date = new Date('2020-01-01');
    const endDate: Date = new Date('2020-01-02');
    const location: string = 'testLocation';
    const buildingId: string = 'testBuildingId';
    const campusEvent: CampusEvent = new CampusEvent(title, description, startDate, endDate, location, buildingId);
    const wrapper = render(<CampusEventComponent campusEvent={campusEvent}/>);
    test('title should be present and unmodified', () => {
      expect(wrapper.text().includes(title)).toBe(true);
    });
    test('description should be present and unmodified', () => {
      expect(wrapper.text().includes(description)).toBe(true);
    });
    test('startDate should be present and unmodified', () => {
      expect(wrapper.text().includes(startDate)).toBe(true);
    });
    test('endDate should be present and unmodified', () => {
      expect(wrapper.text().includes(endDate)).toBe(true);
    });
    test('location should be present and unmodified', () => {
      expect(wrapper.text().includes(location)).toBe(true);
    });
    test('buildingId should not be present', () => {
      expect(wrapper.text().includes(buildingId)).toBe(false);
    });
});