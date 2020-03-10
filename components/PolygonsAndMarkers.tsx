import React, { Component } from 'react';
import { Marker, Polygon } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

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
});

type markersAndPolygonsProps = {
  markers: any[];
  polygons: any[];
};

class PolygonsAndMarkers extends Component<markersAndPolygonsProps, any> {
  constructor(props) {
    super(props);
    const { markers, polygons } = this.props;
    this.state = {
      markers,
      polygons,
    };
  }

  render() {
    const { markers, polygons } = this.state;
    return (
      <>
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
          >
            <View style={styles.circle}>
              <Text style={styles.pinText}>{marker.label}</Text>
            </View>
          </Marker>
        ))}
      </>
    );
  }
}
export default PolygonsAndMarkers;
