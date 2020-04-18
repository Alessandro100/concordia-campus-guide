import React, { Component } from "react";
import { Marker, Polygon } from "react-native-maps";
import { Image, StyleSheet, Text, View } from "react-native";
import {ColorPicker} from "../constants/Colors";
import colorBlindMode from '../classes/colorBlindMode';
import ShuttleBusMarkers from "../constants/CampusShuttleBusStop";
import Building from "../classes/building";
import {
  obtainCoordinateFromBuilding,
  parseLocationToLatLngType,
} from "../services/buildingService";
import Location from "../classes/location";
import Campus from "../classes/campus";
import GoogleMapsAdapter from "../classes/googleMapsAdapter";

const busIcon = require("./../assets/shuttle_bus_icon.png");
let Colors = ColorPicker(colorBlindMode.normal)
const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: Colors.mapMarkerColor,
  },
  pinText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    height: 40,
    width: 40,
  },
});

type markersAndPolygonsProps = {
  places: any[];
  buildings: Building[];
  polygons: Polygon[];
  colorBlindMode: colorBlindMode;
  displaybuilding(building: Building, displayInfo: boolean): void;
};

type markersAndPolygonsState = {
  placesCoordinates: GoogleMapsAdapter;
  polygons: any[];
  shuttleBusMarkers: any[];
  building: Building;
  buildings: Building[];
  location: Location;
  campus: Campus;
};

class PolygonsAndMarkers extends Component<
  markersAndPolygonsProps,
  markersAndPolygonsState
> {
  constructor(props) {
    super(props);
    const { buildings, polygons, colorBlindMode } = this.props;
    this.state = {
      buildings,
      polygons,
      colorBlindMode,
      building: new Building("", "", [], null, "", null, ""),
      location: new Location(0, 0),
      campus: new Campus(null, "", ""),
      shuttleBusMarkers: ShuttleBusMarkers.slice(0),
      placesCoordinates: new GoogleMapsAdapter(),
    };
  }

  displayBuildingInfo = (building: Building, displayInfo: boolean) => {
    const { displaybuilding } = this.props;
    displaybuilding(building, displayInfo);
  };
  componentDidUpdate(prevProps) {
  if (this.props.colorBlindMode !== prevProps.colorBlindMode) {
    this.setState({colorBlindMode: this.props.colorBlindMode});
  }
}
  render() {
    const {
      buildings,
      polygons,
      colorBlindMode,
      shuttleBusMarkers,
      location,
      campus,
      building,
      placesCoordinates,
    } = this.state;
    const { places } = this.props;
    Colors = ColorPicker(colorBlindMode)
    return (
      <View>
        {polygons.map((polygon) => (
          <View
            key={`${String(polygon.latitude)}-${String(polygon.longitude)}`}
          >
            <Polygon
              coordinates={polygon}
              strokeColor={Colors.polygonStroke}
              strokeWidth={1}
              fillColor={Colors.polygonFill}
            />
          </View>
        ))}
        {buildings.map((buildingMarker) => (
          <Marker
            testID={buildingMarker.getIdentifier()}
            key={buildingMarker.getIdentifier()}
            coordinate={parseLocationToLatLngType(
              obtainCoordinateFromBuilding(buildingMarker)
            )}
            title={buildingMarker.getIdentifier()}
            description={buildingMarker.getName()}
            pinColor={Colors.markersPinColor}
            onPress={() => {
              location.setLatitude(buildingMarker.getLocation().getLatitude());
              location.setLongitude(
                buildingMarker.getLocation().getLongitude()
              );
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
              <Text style={styles.pinText}>
                {buildingMarker.getIdentifier()}
              </Text>
            </View>
          </Marker>
        ))}
        {shuttleBusMarkers.map((marker) => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <Image source={busIcon} style={styles.icon} />
          </Marker>
        ))}

        {places.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={placesCoordinates.parseGoogleMapLocation(
              marker.geometry.location
            )}
            title={marker.name}
            description={marker.formatted_address}
            pinColor={Colors.primaryColor}
          ></Marker>
        ))}
      </View>
    );
  }
}
export default PolygonsAndMarkers;
