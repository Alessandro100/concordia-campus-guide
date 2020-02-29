import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  campusToggle: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 110,
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
  { setMapLocation(latitude: number, longitude: number): void },
  { currentCampusView: String }
> {
  constructor(props) {
    super(props);

    this.state = {
      currentCampusView: 'SGW',
    };
  }

  buttonStyling(campusSelected) {
    const { currentCampusView } = this.state;
    return {
      backgroundColor: campusSelected === currentCampusView ? Colors.primaryColor : Colors.grey,
      opacity: campusSelected === currentCampusView ? 1 : 0.7,
      padding: 7,
      width: 100,
    };
  }

  toggleCampusView(campusSelected) {
    // @ts-ignore
    const { setMapLocation } = this.props;
    const { currentCampusView } = this.state;
    if (currentCampusView === 'SGW' && campusSelected !== 'SGW') {
      this.setState({ currentCampusView: 'Loyola' });
      setMapLocation(45.4582, -73.6405);
    } else if (currentCampusView === 'Loyola' && campusSelected !== 'Loyola') {
      this.setState({ currentCampusView: 'SGW' });
      setMapLocation(45.497406, -73.577102);
    }
  }

  render() {
    return (
      <View style={styles.campusToggle}>
        <TouchableOpacity
          style={this.buttonStyling('SGW')}
          onPress={() => this.toggleCampusView('SGW')}
        >
          <Text id="toggle-sgw" style={styles.buttonText}>
            SGW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.buttonStyling('Loyola')}
          onPress={() => this.toggleCampusView('Loyola')}
        >
          <Text id="toggle-loyola" style={styles.buttonText}>
            Loyola
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CampusToggleButton;
