import React from 'react';
import renderer from 'react-test-renderer';
import CampusToggleButton from '../components/CampusToggleButton'

describe('Sample Test Suite', () => {
  test('Sample Test Case', () => {
    expect(true).toEqual(true);
  }),
  test('Sample Snapshot Test', () => {
    const tree = renderer
      .create(<CampusToggleButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});