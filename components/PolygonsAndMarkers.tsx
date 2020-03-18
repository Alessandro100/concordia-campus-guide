import React, { Component } from 'react';
import { Marker, Polygon } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import ShuttleBusMarkers from '../constants/CampusShuttleBusStop';
import Location from '../classes/location';
import Building from '../classes/building';
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
  markers: Marker[];
  polygons: Marker[];
  displaybuilding(building: Building, displayInfo: boolean): void;
};

type markersAndPolygonsState = {
  markers: Marker[];
  polygons: Polygon[];
  shuttleBusMarkers: Marker[];
  building: Building;
};

class PolygonsAndMarkers extends Component<markersAndPolygonsProps, markersAndPolygonsState> {
  constructor(props) {
    super(props);
    const { markers, polygons } = this.props;
    this.state = {
      markers,
      polygons,
      shuttleBusMarkers: ShuttleBusMarkers.slice(0),
      building: new Building('', [], null, null, ''),
      location: new Location(0, 0),
      campus: new Campus(null, '', ''),
    };
  }

  displayBuildingInfo = (building: Building) => {
    const { displaybuilding } = this.props;
    displaybuilding(building, true);
  };

  render() {
    const { markers, polygons, shuttleBusMarkers, building, location, campus } = this.state;
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
        {markers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
            onPress={() => {
              location.setLatitude(marker.coordinate.latitude);
              location.setLongitude(marker.coordinate.longitude);
              campus.setLocation(location);
              building.setDescription(marker.description);
              building.setEvents([]);
              building.setCampus(campus, '', 'Concordia');
              building.setLocation(location);
              building.setIdentifier(marker.label);
              this.displayBuildingInfo(building);
            }}
          >
            <View style={styles.circle}>
              <Text style={styles.pinText}>{marker.label}</Text>
            </View>
          </Marker>
        ))}
        {shuttleBusMarkers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <Image source={busIcon} style={styles.icon} />
          </Marker>
        ))}
      </View>
    );
  }
}
export default PolygonsAndMarkers;
