import React from 'react';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  View,
  Image,TouchableHighlight, Text
} from 'react-native';
//import { View, Text, Image, StyleSheet, TouchableHighlight, TextStyle } from 'react-native';
//import { StyleSheet, Dimensions, View,TouchableHighlight } from 'react-native';

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
  /*const styles = StyleSheet.create({
    indoorMapHeader: {
      position: 'absolute',
      top: 0,
      padding: 20,
      width: '100%',
      backgroundColor: Colors.primaryColor,
      display: 'flex',
      alignItems: 'center',
      height: 100,
    },
    outDoorNavButton: {
      position: 'absolute',
      left: 20,
      top: 50,
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
    headerTitle: {
      color: Colors.white,
      position: 'absolute',
      top: 50,
      fontSize: 18,
      fontWeight: 'bold',
    },
    indoorMapFooter: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      height: 100,
    },
    floorNavigatorText: {
      textAlign: 'center',
      color: Colors.black,
      fontSize: 16,
    },
    floorNavigator: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: Colors.white,
      justifyContent: 'center',
    },
  });*/

export default class ShowBusSchedule extends React.Component <{indoorDisplay,busScheduleDisplay}>{
//export default class App extends React.Component {
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
          style={{ width: 430, height: 550 }}
          resizeMode="stretch"
          source={require('./schedule.png')}
          //source={{ uri: 'https://images.unsplash.com/photo-1540759786422-c60d5dc57d7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=570bd0585a4b1b7b27c818f42e98b671&auto=format&fit=crop&w=350&q=80' }}
        />
      </View>
    );
  }
}



/*import React from 'react';
import { StyleSheet, Dimensions, View,TouchableHighlight } from 'react-native';
 
import Pdf from 'react-native-pdf';

const style = StyleSheet.create({

    outDoorNavButton: {
      position: 'absolute',
      left: 20,
      top: 50,
    },
  });
 
export default class BusScheduleDisplay extends React.Component <{indoorDisplay,busScheduleDisplay}>{

    changeToOutdoorView = () => {
        const { indoorDisplay } = this.props;
        indoorDisplay(false);
        const { busScheduleDisplay } = this.props;
        busScheduleDisplay(false);
      };

    render() {
        //const source = require('./Shuttle-Bus-Schedule-winter 2020.pdf');
        const source = {uri:'C:\Users\incredible victory\Documents\School\Winter 2020\soen 390\Group project\staging clone 2\concordia-campus-guide\Shuttle-Bus-Schedule-winter 2020.pdf',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///concordia-campus-guide/Shuttle-Bus-Schedule-winter 2020.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
 
        return (
            <View style={styles.container}>
                <TouchableHighlight
                style={style.outDoorNavButton}
                onPress={() => {
                this.changeToOutdoorView();}}>

                </TouchableHighlight>

                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
            </View>
        )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});*/