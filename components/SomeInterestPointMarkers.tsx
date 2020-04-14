
import React, { Component } from 'react';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OutCampusInterestMarkers from '../constants/OutCampusInterestMarkers';

type appState = {
    outCampusMarkers: any[];
  };

  class SomeInterestPointMarkers extends Component <{}, appState>{
    constructor(props) {
      super(props);
      this.state = {
        outCampusMarkers: OutCampusInterestMarkers.slice(0)
      };
    }
  
    render() {
      const { outCampusMarkers } = this.state;
      return (
        <View>
          {outCampusMarkers.map(outCampusMarker => (
    <Marker
      coordinate={outCampusMarker.coordinate}
    >
      <Icon 
      name={outCampusMarker.icon}
      size={40}
      color={outCampusMarker.pinColor}/>
      <Callout>
        <View style={{width:100}}>
          <Text>{outCampusMarker.type}</Text>
          <Text>{outCampusMarker.name}</Text>
        </View>
      </Callout>
    </Marker>
  ))}
        </View>
      );
    }
  }
  export default SomeInterestPointMarkers;
  