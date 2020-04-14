import React, { Component } from 'react';
import { Marker, Polygon } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import Building from '../classes/building';
import {
  obtainCoordinateFromBuilding,
  parseLocationToLatLngType,
} from '../services/buildingService';
import Location from '../classes/location';
import Campus from '../classes/campus';

const busIcon = require('./../assets/shuttle_bus_icon.png');

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: Colors.mapMarkerColor,
  },
  pinText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    height: 40,
    width: 40,
  },
});

type markersAndPolygonsProps = {
  buildings: Building[];
  polygons: Polygon[];
  displaybuilding(building: Building, displayInfo: boolean): void;
};

type markersAndPolygonsState = {
  polygons: Polygon[];
  building: Building;
  buildings: Building[];
};

class PolygonsAndMarkers extends Component<markersAndPolygonsProps, markersAndPolygonsState> {
  constructor(props) {
    super(props);
    const { buildings, polygons } = this.props;
    this.state = {
      buildings,
      polygons,
      building: new Building('', '', [], null, null, ''),
      location: new Location(0, 0),
      campus: new Campus(null, '', ''),
    };
  }

  displayBuildingInfo = (building: Building, displayInfo: boolean) => {
    const { displaybuilding } = this.props;
    displaybuilding(building, displayInfo);
  };

  render() {
    const { buildings, polygons, location, campus, building } = this.state;
    return (
      <View>
        {polygons.map(polygon => (
          <View key={`${String(polygon.latitude)}-${String(polygon.longitude)}`}>
            <Polygon
              coordinates={polygon}
              strokeColor={Colors.polygonStroke}
              strokeWidth={1}
              fillColor={Colors.polygonFill}
            />
          </View>
        ))}
        {buildings.map(buildingMarker => (
          <Marker
            testID={buildingMarker.getIdentifier()}
            key={buildingMarker.getIdentifier()}
            coordinate={parseLocationToLatLngType(obtainCoordinateFromBuilding(buildingMarker))}
            title={buildingMarker.getIdentifier()}
            description={buildingMarker.getName()}
            pinColor={Colors.markersPinColor}
            onPress={() => {
              location.setLatitude(buildingMarker.getLocation().getLatitude());
              location.setLongitude(buildingMarker.getLocation().getLongitude());
              campus.setLocation(buildingMarker.getLocation());
              building.setName(buildingMarker.getName());
              building.setDescription(buildingMarker.getDescription());
              building.setEvents(buildingMarker.getEvents()); // TODO: change for event feature
              building.setTitle(buildingMarker.title);
              building.setCampus(campus);
              building.setLocation(location);
              building.setIdentifier(buildingMarker.getIdentifier());
              this.displayBuildingInfo(building, true);
            }}
          >
            <View style={styles.circle}>
              <Text style={styles.pinText}>{buildingMarker.getIdentifier()}</Text>
            </View>
          </Marker>
        ))}
      </View>
    );
  }
}
export default PolygonsAndMarkers;
