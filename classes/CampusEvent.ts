import PointOfInterest from './pointOfInterest';

class campusEvent {
  private _title : string;
  private _description : string;
  private _startDate : Date;
  private _endDate : Date;
  private _location : string;
  private _buildingId : string;

  constructor(title: string, description: string, startDate: Date, endDate: Date, location: string, buildingId: string = '') {
    this._title = title;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._location = location;
    this._buildingId = buildingId;
  }

  public get title() : string {
    return this._title;
  }

  public set title(v : string) {
    this._title = v;
  }
  
  public get description() : string {
    return this._description;
  }

  public set description(v : string) {
    this._description = v;
  }
  
  public get startDate() : Date {
    return this._startDate;
  }

  public set startDate(v : Date) {
    this._startDate = v;
  }

  public get endDate() : Date {
    return this._endDate;
  }

  public set endDate(v : Date) {
    this._endDate = v;
  }

  public get location() : string {
    return this._location;
  }

  public set location(v : string) {
    this._location = v;
  }

  public get buildingId() : string {
    return this._buildingId;
  }
  public set buildingId(v : string) {
    this._buildingId = v;
  }

}

export default campusEvent;