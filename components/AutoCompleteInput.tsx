import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import IndoorPOIService from '../services/indoorPOIService';
import { REACT_APP_GOOGLE_PLACES_API } from "react-native-dotenv";
import Location from "../classes/location";
import IndoorPOI from "../classes/indoorPOI";
import OutdoorPOI from "../classes/outdoorPOI";
import PointOfInterest from "../classes/pointOfInterest";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mytext: {
    color: Colors.grey
  }
});
type autoStates = {
  query: string;
  places: any;
  indoor: any;
  indoorResults: any;
  lat: number;
  long: number;
  modalVisible: boolean;
  position: Location;
};
type autoProps = {
  lat: number;
  lng: number;
  type: string;
  styleInput: any;
  styleSugg: any;
  btnStyle: any;
  setMapLocation(location: Location): void;
  getNavInfo(
    type: string,
    poi: PointOfInterest,
    inOrOut: boolean
  ): void;
};

class Autocomplete extends Component<autoProps, autoStates> {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props;
    this.state = {
      modalVisible: false,
      query: "",
      places: [],
      indoor: IndoorPOIService.getIndoorPOIs(),
      indoorResults: [],
      lat: lat,
      long: lng,
      position: new Location(0, 0)
    };
  }
  async onChangeQuery(query: string) {
    const { indoor, lat, long } = this.state;

    this.setState({ query: query });
    const api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&radius=1000&strictbounds&location=${lat},${long}&key=${REACT_APP_GOOGLE_PLACES_API}`;
    const results = await fetch(api);
    const json = await results.json();
    this.setState({ places: json.predictions });
    if (query.length === 0) {
      this.setState({ indoorResults: [] });
    } else {
      const filteredData = indoor.filter(x =>
        String(x.identifier.toLowerCase()).includes(query.toLowerCase())
      );
      this.setState({ indoorResults: filteredData });
    }
  }

  setMapLocation = (lat, lng) => {
    const { setMapLocation } = this.props;
    setMapLocation(new Location(lat, lng));
  };

  getIndoorInfo(sugg: IndoorPOI) {
    const { getNavInfo, type } = this.props;
    this.setState({ modalVisible: false });
    this.setState({ query: String(sugg.getIdentifier()) });
    //indoor is true
    getNavInfo(
      type,
      sugg,
      true
    );
  }

  async getOutdoorInfo(sugg: any) {
    const { setMapLocation, getNavInfo, type } = this.props;
    const { position } = this.state;
    this.setState({ modalVisible: false });
    this.setState({ query: sugg.description });
    let id = sugg.place_id;

    const api = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,geometry&key=${REACT_APP_GOOGLE_PLACES_API}`;
    const results = await fetch(api);
    const json = await results.json();
    this.setState({ lat: json.result.geometry.location.lat });
    this.setState({ long: json.result.geometry.location.lng });
    position.setLatitude(Number(json.result.geometry.location.lat));
    position.setLongitude(Number(json.result.geometry.location.lng));
    setMapLocation(position);
    //outdoor is false
    const outdoorPOI = new OutdoorPOI(position, '')
    getNavInfo(
      type,
      outdoorPOI,
      false
    );
  }

  modalVisible() {
    this.setState({ modalVisible: true });
  }

  render() {
    const { indoorResults, places, query, modalVisible } = this.state;
    const { styleInput, styleSugg, btnStyle, type } = this.props;
    let value = "";
    if (query.length > 0) {
      value = query;
    } else {
      value = type;
    }
    const indoorSuggestions = indoorResults.map(suggestion => (
      <Text
        onPress={() => this.getIndoorInfo(suggestion)}
        key={suggestion.identifier}
        style={styleSugg}
      >
        {suggestion.identifier}
      </Text>
    ));
    const placesSuggestions = places.map(prediction => (
      <Text
        onPress={() => this.getOutdoorInfo(prediction)}
        key={prediction.id}
        style={styleSugg}
      >
        {prediction.description}
      </Text>
    ));

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.modalVisible()} style={btnStyle}>
          <View>
            <Text numberOfLines={1} style={styles.mytext}>
              {value}
            </Text>
          </View>
        </TouchableOpacity>

        <Modal transparent={true} visible={modalVisible}>
          <TextInput
            autoFocus={true}
            style={styleInput}
            placeholder={type}
            value={query}
            onChangeText={query => this.onChangeQuery(query)}
          />
          {indoorSuggestions}
          {placesSuggestions}
        </Modal>
      </View>
    );
  }
}
export default Autocomplete;
