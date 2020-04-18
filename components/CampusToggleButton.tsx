import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import {ColorPicker} from '../constants/Colors';
import CampusLocations from '../constants/CampusLocations';
import Location from '../classes/location';
import colorBlindMode from '../classes/colorBlindMode';

let Colors = ColorPicker(colorBlindMode.normal)
const styles = StyleSheet.create({
  campusToggle: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    zIndex: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

class CampusToggleButton extends Component<
  { setMapLocation(location: Location): void },
  { currentCampusView: String; colorBlindMode:colorBlindMode;}
> {
  constructor(props) {
    super(props);

    this.state = {
      currentCampusView: CampusLocations.SGW.getIdentifier(),
      colorBlindMode: props.colorBlindMode
    };
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.colorBlindMode !== prevProps.colorBlindMode) {
    this.setState({colorBlindMode: this.props.colorBlindMode});
  }
}

  buttonStyling(campusSelected) {
    const { currentCampusView, colorBlindMode } = this.state;
    let colors = ColorPicker(colorBlindMode)
    return {
      backgroundColor: campusSelected === currentCampusView ? colors.primaryColor : colors.grey,
      opacity: campusSelected === currentCampusView ? 1 : 0.7,
      padding: 7,
      width: 100,
    };
  }

  toggleCampusView(campusSelected) {
    const { setMapLocation } = this.props;
    const { currentCampusView } = this.state;
    if (
      currentCampusView === CampusLocations.SGW.getIdentifier() &&
      campusSelected !== CampusLocations.SGW.getIdentifier()
    ) {
      this.setState({ currentCampusView: CampusLocations.Loyola.getIdentifier() });
      setMapLocation(CampusLocations.Loyola.getLocation());
    } else if (
      currentCampusView === CampusLocations.Loyola.getIdentifier() &&
      campusSelected !== CampusLocations.Loyola.getIdentifier()
    ) {
      this.setState({ currentCampusView: CampusLocations.SGW.getIdentifier() });
      setMapLocation(CampusLocations.SGW.getLocation());
    }
  }

  render() {
    Colors = ColorPicker(this.state.colorBlindMode);
    return (
      <View style={styles.campusToggle}>
        <TouchableHighlight
          style={this.buttonStyling(CampusLocations.SGW.getIdentifier())}
          onPress={() => this.toggleCampusView(CampusLocations.SGW.getIdentifier())}
        >
          <Text testID="toggle-sgw" style={styles.buttonText}>
            SGW
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          testID="toggle-loyola-button"
          style={this.buttonStyling(CampusLocations.Loyola.getIdentifier())}
          onPress={() => this.toggleCampusView(CampusLocations.Loyola.getIdentifier())}
        >
          <Text testID="toggle-loyola" style={styles.buttonText}>
            Loyola
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default CampusToggleButton;
