import CampusEventWebScraper from '../classes/CampusEventWebScraper';
import fs from 'fs';
import path from 'path';

describe('CampusEventWebScraper Test Suite', () => {
  const instance1 = CampusEventWebScraper.instance;
  test('Singleton Instance Test Case', () => {
    const instance2 = CampusEventWebScraper.instance;
    expect(instance1).toEqual(instance2);
  }),
  test('Ready Attribute Test Case', () => {
    expect(instance1.ready).toEqual(false);
    instance1.fillCampusEvents(fs.readFileSync(path.resolve(__dirname,'./assets/events.html'), 'utf8'));
    expect(instance1.ready).toEqual(true);
  }),
  test('Events Filtering Test Case', () => {
    expect(instance1.getCampusEvents('MB').length).toEqual(1);
  })
});