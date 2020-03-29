import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Button} from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import ShowDirection from './components/ShowDirection';
import transportMode from './classes/transportMode';
import colorBlindMode from './classes/colorBlindMode';
import CampusPolygons from './constants/CampusPolygons';
import CampusMarkers from './constants/CampusMarkers';
import Colors, { ColorPicker } from './constants/Colors';
import Settings from './components/Settings';

type appState = {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  polygons: any[];
  markers: any[];
  settings: {
   colorBlindMode: colorBlindMode,
   showSettingsScreen: boolean
  };
  colors: any;
};

class App extends Component<{}, appState> {
  constructor(props) {
    super(props);

    this.state = {
       settings: {
        colorBlindMode: colorBlindMode.normal,
        showSettingsScreen: false
       },
      colors: ColorPicker(colorBlindMode.normal),
      region: {
        // this is the SGW campus location
        latitude: 45.497406,
        longitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
      polygons: CampusPolygons.slice(0),
      markers: CampusMarkers.slice(0),
    };
  }

  setMapLocation = (latitude, longitude) => {
    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      },
    });
  };
  setColorBlindMode = (colorBlindMode: colorBlindMode) => {
    const newColors = ColorPicker(colorBlindMode)
        this.setState({
            colors: newColors,
            settings:{
                colorBlindMode: colorBlindMode,
                showSettingsScreen: false
            }
        });
  }
  render() {
    const { region, polygons, markers, settings, colors} = this.state;
    const styles = StyleSheet.create({
      settingsButtonContainer: {
        position:'absolute',
        top: 25,
        left:0,
        zIndex: 3
      },
      container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
      search: {
        width: Dimensions.get('window').width - 50,
        height: 50,
        backgroundColor: colors.white,
        position: 'absolute',
        zIndex: 2,
        top: 60,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
      },
      mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: colors.mapMarkerColor,
      },
      pinText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
      },
    });
    return (
      <View style={styles.container}>
        {settings.showSettingsScreen === false ? (<View style={styles.settingsButtonContainer}>
          <Button
              title="Settings"
              color={colors.primaryColor}
              onPress={() => {
                this.setState({
                  settings: {
                   colorBlindMode: settings.colorBlindMode,
                   showSettingsScreen: true
                  }
                })
              }} />
        </View>) :null }
      <View style={styles.settingsScreen}>
        {settings.showSettingsScreen ? <Settings colorBlindMode={settings.colorBlindMode} setColorBlindMode={this.setColorBlindMode.bind(this)} /> : null}
      </View>
        <View style={styles.search} />
        {this.state.settings.showSettingsScreen === false ?  (
          <>
          <CampusToggleButton setMapLocation={this.setMapLocation} currentColorBlindMode={settings.colorBlindMode}/>
            <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} region={region}>
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
              <ShowDirection
                startLat={45.458488}
                startLon={-73.639862}
                endLat={45.50349}
                endLon={-73.572182}
                transportType={transportMode.transit}
              />
            </MapView>
        </>) : null}
      </View>
    );
  }
}
/*
*/

export default App;
