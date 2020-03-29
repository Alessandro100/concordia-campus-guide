import CampusEvent from '../classes/CampusEvent';

describe('CampusEvent Test Suite', () => {
  const title: string = 'testTitle';
  const description: string = 'testDescription';
  const startDate: Date = new Date('2020-01-01');
  const endDate: Date = new Date('2020-01-02');
  const location: string = 'testLocation';
  const buildingId: string = 'testBuildingId';
  const campusEvent: CampusEvent = new CampusEvent(title, description, startDate, endDate, location, buildingId);
  test('Getters Test Case', () => {
    expect(campusEvent.title).toEqual(title);
    expect(campusEvent.description).toEqual(description);
    expect(campusEvent.startDate).toEqual(startDate);
    expect(campusEvent.endDate).toEqual(endDate);
    expect(campusEvent.location).toEqual(location);
    expect(campusEvent.buildingId).toEqual(buildingId);
  }),
  test('Setters Test Case', () => {
    const title2: string = 'testTitle2';
    campusEvent.title = title2;
    expect(campusEvent.title).toEqual(title2);

    const description2: string = 'testDescription2';
    campusEvent.description = description2;
    expect(campusEvent.description).toEqual(description2);

    const startDate2: Date = new Date('2020-02-01');
    campusEvent.startDate = startDate2;
    expect(campusEvent.startDate).toEqual(startDate2);

    const endDate2: Date = new Date('2020-02-02');
    campusEvent.endDate = endDate2;
    expect(campusEvent.endDate).toEqual(endDate2);

    const location2: string = 'testLocation2';
    campusEvent.location = location2;
    expect(campusEvent.location).toEqual(location2);

    const buildingId2: string = 'testBuildingId2';
    campusEvent.buildingId = buildingId2;
    expect(campusEvent.buildingId).toEqual(buildingId2);
  })
});