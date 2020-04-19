import React from 'react';
import { shallow, mount, render } from 'enzyme';
import GoogleCalendarEventComponent from '../components/GoogleCalendarEventComponent';
import CampusEvent from '../classes/CampusEvent';

describe('GoogleCalendarEventComponent Test Suite', () => {
    const title: string = 'testTitle';
    const description: string = 'testDescription';
    const startDate: Date = new Date('2020-01-01');
    const endDate: Date = new Date('2020-01-02');
    const location: string = 'testLocation';
    const campusEvent: CampusEvent = new CampusEvent(title, description, startDate, endDate, location);
    const wrapper = render(<GoogleCalendarEventComponent campusEvent={campusEvent}/>);
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
});