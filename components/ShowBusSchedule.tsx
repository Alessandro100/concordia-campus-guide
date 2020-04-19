import React from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  Image,TouchableHighlight, Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CA1B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLogo: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    left: -20,
  },
  outDoorNavButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
const style1 = StyleSheet.create({

    outDoorNavButton: {
      position: 'absolute',
      left: 20,
      top: 50,
    },
    
  });

export default class ShowBusSchedule extends React.Component <{indoorDisplay: any,busScheduleDisplay: any}>{

    changeToOutdoorView = () => {
        const { indoorDisplay } = this.props;
        indoorDisplay(false);
    };
  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight
                style={style1.outDoorNavButton}
                onPress={() => {
                this.changeToOutdoorView();}}>
            <>
              <Image style={styles.navLogo} source={require('../assets/back-white.png')} />
              <Text style={styles.outDoorNavButtonText}>Outdoor Map</Text>
            </>
        
          </TouchableHighlight>

        <Image
          style={{ width: 430, height: 450 }}
          resizeMode="stretch"
          source={require('./schedule.png')}
        />
      </View>
    );
  }
}
