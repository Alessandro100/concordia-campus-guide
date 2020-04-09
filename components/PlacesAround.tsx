import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Colors, {ColorPicker} from '../constants/Colors';
import {stylesWithColorBlindSupport} from '../constants/AppStyling';
import Location from '../classes/location';
import { REACT_APP_GOOGLE_PLACES_API } from "react-native-dotenv";

type placeState = {
  location:Location;
 };

type placeProps = {
   lat:number;
   long:number;
   showPlaces(places:any[]):void;
};
const styles = stylesWithColorBlindSupport(Colors)
class PlacesAround extends Component<placeProps,placeState> {
  constructor(props) {
    super(props);
const {lat,long} = this.props;
    this.state = {
      location:new Location(lat,long),
    };
  }
  async findPlaces(type:string){
    const { location } = this.state;
  const api = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}&radius=2000&location=${location.getLatitude()},${location.getLongitude()}&key=${REACT_APP_GOOGLE_PLACES_API}`;
  const results = await fetch(api);
  const json = await results.json();
  const {showPlaces}=this.props;
  showPlaces(json.results);

}


  render() {
    return (
      <View style={styles.optionsContainer}>
       <TouchableOpacity style={styles.options} onPress={() => this.findPlaces("restaurant")}>

           <Image
              style={styles.iconSize}
              source={require("../assets/restaurant.png")}/>
              </TouchableOpacity>
        <TouchableOpacity style={styles.options}  onPress={() => this.findPlaces("cafe")}>
           <Image
              style={styles.iconSize}
              source={require("../assets/cafe.png")}/>
              </TouchableOpacity>
        <TouchableOpacity style={styles.options}  onPress={() => this.findPlaces("fast+food")}>
           <Image
              style={styles.iconSize}
              source={require("../assets/fastfood.png")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}  onPress={() => this.findPlaces("museum")}>
           <Image
              style={styles.iconSize}
              source={require("../assets/museum.png")}/>
              </TouchableOpacity>

      </View>
    );
  }
}

export default PlacesAround;
