import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Autocomplete from "./AutoCompleteInput";
import Location from "../classes/location";
import autocompleteStyle from "../constants/AutocompleteStylingProps";
import styles from "../constants/DirectionInputStyling";
import PointOfInterest from "../classes/pointOfInterest";
import OutdoorPOI from "../classes/outdoorPOI";
import transportMode from "../classes/transportMode";
import Colors from "../constants/Colors";

type inputState = {
  inputModal: boolean;
  lat: number;
  long: number;
  position: Location;
  destination: OutdoorPOI;
  selectedTransportOption: transportMode;
};
type inputProps = {
  lat: number;
  lng: number;
  destination: OutdoorPOI;
  setMapLocation(position: Location): void;
  getNavInfo(type: string, poi: PointOfInterest, inOrOut: boolean): void;
  setTransportationMethod(selectedTransportMode: transportMode);
};
class DirectionInput extends Component<inputProps, inputState> {
  constructor(props) {
    super(props);
    const { lat, lng, destination } = this.props;
    this.state = {
      inputModal: false,
      destination,
      lat: lat,
      long: lng,
      position: new Location(0, 0),
      selectedTransportOption: null,
    };
  }

  // update the point of interest when the props changes
  componentDidUpdate(prevProps) {
    const { destination } = this.props;
    const { inputModal } = this.state;
    if (prevProps.destination !== destination) {
      this.setState({ destination: destination });

      // open the input modal is the destination (point of interest) is not null and the input modal is closed
      if (destination.identifier.length > 0 && inputModal === false) {
        this.showInput();
      }
    }
  }

  showInput() {
    const { inputModal } = this.state;
    if (inputModal === false) {
      this.setState({ inputModal: true });
    }
  }

  hideInput() {
    const { inputModal, destination } = this.state;
    if (inputModal === true) {
      this.setState({ inputModal: false });
      // when user is done whith input set the point of interest to null
      destination.setLongitude("");
    }
  }

  selectTransportOption = (selectedTransportMode: transportMode) => {
    const {setTransportationMethod} = this.props;
    this.setState({selectedTransportOption: selectedTransportMode})
    setTransportationMethod(selectedTransportMode)
  }

  getTransportModeStyle(transportOption: transportMode) {
    const {selectedTransportOption} = this.state;
    return {
      backgroundColor: (transportOption === selectedTransportOption) ? Colors.primaryColor : Colors.white,
      borderRadius: 50
    }
  }

  displayInputs() {
    const { inputModal, lat, long, position, destination } = this.state;
    const { getNavInfo, setMapLocation } = this.props;
    position.setLatitude(Number(lat));
    position.setLongitude(Number(long));
    if (inputModal === false) {
      // if the inputModal is false, then show nav button
      return (
        <View style={styles.navBtn}>
          <TouchableOpacity testID="navBtn" onPress={() => this.showInput()}>
            <Image
              style={styles.iconSizeNavBtn}
              source={require("../assets/directions.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
    // else hide button and display input modal

    return (
      <View style={styles.modal}>
        <View style={styles.row1}>
          <TouchableOpacity
            testID="returnBtn"
            style={styles.sizeColumn1}
            onPress={() => this.hideInput()}
          >
            <Image
              style={styles.iconSize}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <View style={styles.sizeColumn2}>
            <View style={styles.bigDot} />
            <Image style={styles.dots} source={require("../assets/dots.png")} />
            <Image style={styles.dest} source={require("../assets/dest.png")} />
          </View>

          <View style={styles.sizeColumn3}>
            <Autocomplete
              getNavInfo={getNavInfo}
              setMapLocation={setMapLocation}
              btnStyle={autocompleteStyle.btnStyling}
              styleSugg={autocompleteStyle.startSuggestions}
              styleInput={autocompleteStyle.startInput}
              type="Start"
              defaultInput={null}
              lat={lat}
              lng={long}
            />
            <Autocomplete
              getNavInfo={getNavInfo}
              setMapLocation={setMapLocation}
              btnStyle={autocompleteStyle.btnStyling}
              styleSugg={autocompleteStyle.destSuggestions}
              styleInput={autocompleteStyle.destInput}
              type="Destination"
              defaultInput={destination}
              lat={lat}
              lng={long}
            />
          </View>
          <View style={styles.sizeColumn4}>
            <TouchableOpacity>
              <Image
                style={styles.iconSize}
                source={require("../assets/dots.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.invert}
                source={require("../assets/inverse.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity style={this.getTransportModeStyle(transportMode.transit)} onPress={() => this.selectTransportOption(transportMode.transit)}> 
            <View style={styles.navOptions}>
              <Image
                style={styles.iconSize}
                source={require("../assets/concordia.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={this.getTransportModeStyle(transportMode.driving)} onPress={() => this.selectTransportOption(transportMode.driving)}> 
            <View style={styles.navOptions}>
              <Image
                style={styles.iconSize}
                source={require("../assets/car.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={this.getTransportModeStyle(transportMode.walking)} onPress={() => this.selectTransportOption(transportMode.walking)}> 
            <View style={styles.navOptions}>
              <Image
                style={styles.iconSize}
                source={require("../assets/walk.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={this.getTransportModeStyle(transportMode.bicycle)} onPress={() => this.selectTransportOption(transportMode.bicycle)}> 
            <View style={styles.navOptions}>
              <Image
                style={styles.iconSize}
                source={require("../assets/bike.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return this.displayInputs();
  }
}

export default DirectionInput;
