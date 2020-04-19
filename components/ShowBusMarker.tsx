import React, { Component } from 'react';
import { Marker, Polygon,Callout } from 'react-native-maps';
import { Image, StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';
import ShuttleBusMarkers from '../constants/CampusShuttleBusStop';
const busIcon = require('./../assets/shuttle_bus_icon.png');
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
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

type appState = {
    shuttleBusMarkerss: any[];
  };


export default class ShowBusMarker extends React.Component <{indoorDisplay,busScheduleDisplay,shuttleBusMarkers}> {
  constructor(props) {
    super(props);
    
    this.state = {
      shuttleBusMarkers: ShuttleBusMarkers.slice(0),
    };
  }

  changeToBusScheduleView = () => {
    const { indoorDisplay } = this.props;
    indoorDisplay(true); 
  };

  render() {  
    const { shuttleBusMarkers } = this.props;
    
    return (
      <View>
        {shuttleBusMarkers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => {this.changeToBusScheduleView();}}
          >
            <Icon name='bus' size={30} iconStyle={styles.icon}/>
            <Callout>
                <TouchableHighlight>              
                    <View style={{width:150}}>
                        <Text>{marker.title}{"\n"}{marker.description}{"\n"}{'TAP HERE to see bus schedule'}</Text>
                    </View>
                </TouchableHighlight>
            </Callout>
            
          </Marker>
        ))}
      </View>
    );
  }
}
;
/*
<TouchableHighlight
                style={style1.outDoorNavButton}
                onPress={() => {
                this.changeToOutdoorView();}}>


{this.state.markers.map((marker) => (
    <MapView.Marker
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}>
        <MapView.Callout tooltip style={styles.customView}>
            <TouchableHighlight onPress= {()=>this.markerClick()} underlayColor='#dddddd'>
                <View style={styles.calloutText}>
                    <Text>{marker.title}{"\n"}{marker.description}</Text>
                </View>
            </TouchableHighlight>
          </MapView.Callout>
      </MapView.Marker>
      <Image source={busIcon} style={styles.icon} />
  ))}*/
