import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Location from '../classes/location';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  positionBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    zIndex: 2,
    position: 'absolute',
    bottom: 140,
    right: 30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconSize: {
    height: 25,
    width: 25,
  },
});

class CurrentPosition extends Component<
  { setMapLocation(location: Location): void },
  { position: Location }
> {
  constructor(props) {
    super(props);

    this.state = {
      position: new Location(0, 0),
    };
  }

  updateLocation = (coordinate: Location) => {
    const { position } = this.state;
    position.setLatitude(coordinate.latitude);
    position.setLongitude(coordinate.longitude);
  };

  success = (location: any) => {
    const { setMapLocation } = this.props;
    const { position } = this.state;
    position.setLatitude(location.coords.latitude);
    position.setLongitude(location.coords.longitude);
    setMapLocation(position);
  };

  displayCurrentLocation() {
    const options = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    navigator.geolocation.getCurrentPosition(this.success, null, options);
  }

  render() {
    return (
      <View style={styles.positionBtn}>
        <TouchableOpacity onPress={() => this.displayCurrentLocation()}>
          <Image style={styles.iconSize} source={require('../assets/cp.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
export default CurrentPosition;
