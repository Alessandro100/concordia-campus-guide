import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Autocomplete from "./AutoCompleteInput";
import Location from "../classes/location";
import autocompleteStyle from "../constants/AutocompleteStylingProps"
import styles from "../constants/DirectionInputStyling"

type inputState = {
  inputModal: boolean;
  startInput: string;
  endInput: string;
  lat: number;
  long: number;
  position: Location;
};
type inputProps = {
  lat: number;
  lng: number;
  setMapLocation(position: Location): void;
  getNavInfo(
    x: number,
    y: number,
    type: string,
    id: string,
    inOrOut: boolean
  ): void;
};
class DirectionInput extends Component<inputProps, inputState> {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props;
    this.state = {
      inputModal: false,
      startInput: "",
      endInput: "",
      lat: lat,
      long: lng,
      position: new Location(0, 0)
    };
  }

  handleStartChange = (text: string) => {
    this.setState({ startInput: text });
  };

  handleEndChange = (text: string) => {
    this.setState({ endInput: text });
  };

  showInput() {
    const { inputModal } = this.state;
    if (inputModal === false) {
      this.setState({ inputModal: true });
    }
  }

  hideInput() {
    const { inputModal } = this.state;
    if (inputModal === true) {
      this.setState({ inputModal: false });
    }
  }

  invertInputs() {
    const { startInput, endInput } = this.state;
    this.setState({ endInput: startInput });
    this.setState({ startInput: endInput });
  }

  displayInputs() {
    const { inputModal, lat, long, position } = this.state;
    position.setLatitude(Number(lat));
    position.setLongitude(Number(long));
    if (inputModal === false) {
      // if the inputModal is false, then show nav button
      return (
        <View style={styles.navBtn}>
          <TouchableOpacity testID="navBtn" onPress={() => this.showInput()}>
            <Image
              style={styles.iconSize}
              source={require("../assets/nav.png")}
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
              getNavInfo={this.props.getNavInfo}
              setMapLocation={this.props.setMapLocation}
              btnStyle={autocompleteStyle.btnStyling}
              styleSugg={autocompleteStyle.startSuggestions}
              styleInput={autocompleteStyle.startInput}
              type="Start"
              lat={lat}
              lng={long}
            />
            <Autocomplete
              getNavInfo={this.props.getNavInfo}
              setMapLocation={this.props.setMapLocation}
              btnStyle={autocompleteStyle.btnStyling}
              styleSugg={autocompleteStyle.destSuggestions}
              styleInput={autocompleteStyle.destInput}
              type="Destination"
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
          <View style={styles.navOptions}>
            <Image
              style={styles.iconSize}
              source={require("../assets/concordia.png")}
            />
            <Text style={styles.optionTxt}>25min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image
              style={styles.iconSize}
              source={require("../assets/car.png")}
            />
            <Text style={styles.optionTxt}>15min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image
              style={styles.iconSize}
              source={require("../assets/walk.png")}
            />
            <Text style={styles.optionTxt}>55min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image
              style={styles.iconSize}
              source={require("../assets/bike.png")}
            />
            <Text style={styles.optionTxt}>35min</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return this.displayInputs();
  }
}

export default DirectionInput;
