import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity,Image } from 'react-native';
import MapView, {Marker, Polygon, PROVIDER_GOOGLE} from 'react-native-maps';
import CampusToggleButton from './components/CampusToggleButton';
import { BuildingPolygons } from "./constants/CampusPolygons";
import { Markers } from './constants/CampusMarkers';
import Colors from './constants/Colors';
import InputBtn from './components/InputBtn';


class App extends Component {
  constructor() {
      super();
      let polygons = BuildingPolygons.slice(0);
      let markersList = Markers.slice(0);
        this.state = {
          ready: false,
          coordinate: {latitude:null, longitude:null},
          error: null,
            region: {
               // this is the SGW campus location
                latitude: 45.497406,
                longitude: -73.577102,
                latitudeDelta: 0,
                longitudeDelta: 0.01,
        },
        polygons: polygons,
        markers: markersList
       
    };
  }
 

componentDidMount(){
  let options = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
  };
  this.setState({ready:false, error: null });
  navigator.geolocation.getCurrentPosition( this.success,this.failure,options);
}
success = (position) => {
  
  this.setState({
      ready:true,
      coordinate: {latitude: position.coords.latitude,longitude:position.coords.longitude }
  })
}
failure = (err) => {
  this.setState({error: err.message});
}
  
  setMapLocation = (latitude, longitude) => {
    this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.01,
      }
    })
  };

  

  render() {

      const { region } = this.state;
    
   

      return (
        <View style={styles.container}>
          <View style={styles.search}/>
          <CampusToggleButton setMapLocation={this.setMapLocation}/>
          <InputBtn/>
          <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} region={region}>
        {this.state.ready && (
        <Marker 
         coordinate={this.state.coordinate}
         title= "me"
        description= "Curernt Position"
        pinColor= 'rgb(163, 9, 9)'/>)}
              {this.state.polygons.map((polygon, index) => (
                  <View key={index}>
                      <Polygon
                          coordinates={polygon}
                          strokeColor= {Colors.polygonStroke}
                          strokeWidth={1}
                          fillColor = {Colors.polygonFill}
                      />
                  </View>
              ))}
              {this.state.markers.map(marker => (
                  <Marker
                      coordinate={marker.coordinate}
                      title={marker.title}
                      description={marker.description}
                      pinColor={marker.pinColor}>
                      <View style={styles.circle}>
                          <Text style={styles.pinText}>{marker.label}</Text>
                      </View>
                  </Marker>
                 
              ))}
         
          </MapView>
          
        </View>
    );}
    
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    width: Dimensions.get('window').width - 50,
    height: 50,
    backgroundColor: 'white',
    position: "absolute",
    zIndex: 2,
    top: 50,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  campusToggle: {
    display: "flex",
    flexDirection: 'row',
    position: "absolute",
    top: 110,
    zIndex: 2,
    borderRadius: 10,
    overflow: "hidden"
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  circle: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'rgba(84,24,5,0.99)',
  },
  pinText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 10,
  },
  
});

export default App;
