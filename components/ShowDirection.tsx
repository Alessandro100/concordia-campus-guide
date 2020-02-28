import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Polyline from '@mapbox/polyline'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


class ShowDirection extends Component {

  constructor(props) {
super(props)
  
    this.state = {
      coords:[],
      // Region is set to fit Concordia campus.
      region: {
        latitude: 45.4582,
        longitude: -73.6405,
        desLatitude: 45.497406,
        desLongitude: -73.577102,
        latitudeDelta: 0,
        longitudeDelta: 0.1,
      },
      // Hard coded adresses to display path.
      startLocation: "7141 Rue Sherbrooke Ouest, Montréal, QC H4B 1R6",
      destination: "1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8",
      x: 'true',

      
    }
    this.getDirections = this.getDirections.bind(this);
  }

    // This function takes adresses as input and call the google API.
    // Time and distance are unused but left here for potential extra.
    async getDirections(startLoc, desLoc) {
     
        try {
          const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=transit&key=AIzaSyDpY_ACPWoo3mVPPmiLKQe1aBhjkDYlwJI`);
          const respJson = await resp.json();
          const response = respJson.routes[0]
          const distanceTime = response.legs[0];
          const distance = distanceTime.distance.text;
          const time = distanceTime.duration.text;
          const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        console.log(coords, 'coords');
        this.setState({coords: coords});
        return coords;
        } catch(error) {
        
        }
      }

     componentDidMount() {
       this.getDirections(this.state.startLocation, this.state.destination);
     } 

    render(){
        
        return( 
        <MapView 
            showsUserLocation
            style={styles.mapStyle}
            initialRegion={this.state.region}
          >
      
          <MapView.Polyline
            strokeWidth={2}
            strokeColor="red"
            coordinates={this.state.coords}
          />
        </MapView>
        )
    }
}


const styles = StyleSheet.create({
  
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

 },
});

export default ShowDirection;