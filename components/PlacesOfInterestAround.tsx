import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "../constants/AppStyling";
import { REACT_APP_GOOGLE_PLACES_API } from "react-native-dotenv";


type placeProps = {
  lat: number;
  long: number;
  showPlaces(places: any[]): void;
};
class PlacesOfInterestAround extends Component<placeProps> {
 
  async findPlaces(type: string) {
    const { lat, long } =this.props;
    const api = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}&radius=1000&location=${lat},${long}&key=${REACT_APP_GOOGLE_PLACES_API}`;
    const results = await fetch(api);
    const json = await results.json();
    const { showPlaces } = this.props;
    showPlaces(json.results);
  }

  render() {
  const placesData = [
      {search:'restaurant', link:require("../assets/restaurant.png")},
      {search:'cafe', link:require("../assets/cafe.png")},
      {search:'fast+food', link:require("../assets/fastfood.png")},
      {search:'museum', link:require("../assets/museum.png")}
    ];

    return (
      <View style={styles.optionsContainer}>
        {placesData.map(place => (
          <TouchableOpacity
            key={place.search}
            style={styles.options}
            onPress={() => this.findPlaces(place.search)}
          >
            <Image
              style={styles.iconSize}
              source={place.link}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default PlacesOfInterestAround;
