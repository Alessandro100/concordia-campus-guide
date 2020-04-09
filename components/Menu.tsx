import React, { Component } from 'react';
import { View,Image, StyleSheet, Text, TouchableOpacity, Modal, Dimensions, Picker } from 'react-native';
import CampusEventContainer from './CampusEventContainer';
import Building from '../classes/building';
import ColorBlindSettings from '../components/ColorBlindSettings';
import colorBlindMode from '../classes/colorBlindMode';
import Colors, { ColorPicker } from '../constants/Colors';
import { obtainBuildings } from '../services/buildingService';


const styles = StyleSheet.create({
  container:{
    alignSelf: "flex-start",

  },
  iconSize:{
    width: 30,
    height: 30,},

    hamburger:{
        position: "absolute",
        zIndex: 9,
        alignSelf: "flex-start",
        top: 50,
        left:25,
        margin:5,
    },
    outsideModal:{
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      backgroundColor:Colors.black,
      zIndex:1,
      opacity:0.7
    },
    modalContainer:{
      width: Dimensions.get("window").width-100,
      height: Dimensions.get("window").height,
      zIndex:2,
      position:'absolute',
      backgroundColor:Colors.white,
      padding:10,
      shadowColor: Colors.black,
      shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },

    modalEventSettingsContainer:{
      justifyContent: "center",
      alignItems: "center",
      zIndex:2,
      top:120,
      width:300,
      height:350,
      position:'absolute',
      alignSelf:"center",
      backgroundColor:Colors.white,
      padding:10,
      shadowColor: Colors.black,
      shadowOffset: {
      width: 0,
      height: 2
                     },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },

    modalLogo:{
      height:200,
      width: "100%",
      backgroundColor:Colors.menuBeige,
      marginBottom:10,
      justifyContent:'center',
      alignItems:'center',
      padding:15,
    },
    logoSize:{
    alignSelf:'center',
    marginBottom:10,
    },
    syncBtn:{
      backgroundColor:Colors.primaryColor,
      height:30,
      width:"100%",
      color:Colors.white,
      justifyContent:'center',
      alignItems:'center',
    },
    syncText:{
      color:Colors.white,
    },
    menuOptions:{
      width:"100%",
      height:40,
      alignSelf:'flex-start',
      flexDirection:'row',
      padding:5,
      justifyContent:'flex-start',
      alignItems:'center',
      marginBottom:10
    },
    aboutLine:{
      backgroundColor:Colors.grey,
      width:"100%",
      height:1,
      opacity:0.4,
    },
    iconMenu:{
    marginRight:10,
    width: 25,
    height: 25,
    },
    pickContainer:{
      marginTop:15,
      borderWidth:0.4,
    },
    buildPicker:{
      width:250,
      height:30,
    }

});

class Menu extends Component<
  {},
  { showMenu: boolean; showEvent:boolean; showSettings:boolean;buildings:Building[];building:Building;
    colorBlindMode: colorBlindMode; setColorBlindMode:Function}
> {
  constructor(props) {
    super(props);

    this.state = {
      showMenu:false,
      showEvent:false,
      showSettings:false,
      buildings: obtainBuildings(),
      building: new Building('','',null,null,'',null,'H'),
      colorBlindMode: props.colorBlindMode,
      setColorBlindMode: props.setColorBlindMode
    };
  }

  ShowZeMenu(){
    this.setState({showMenu:true});
  }
  closeZeMenu(){
    this.setState({showMenu:false});
  }
  closeZeEvents(){
    this.setState({showEvent:false});
  }
  closeZeSettings(){
    this.setState({showSettings:false});
  }
  switchToEvent(){
    this.setState({showMenu:false});
    this.setState({showSettings:false});
    this.setState({showEvent:true});

  };
  switchToSettings(){
    this.setState({showMenu:false});
    this.setState({showEvent:false});
    this.setState({showSettings:true});

  };

  render() {
    const {showMenu, showEvent, showSettings, buildings,building, colorBlindMode, setColorBlindMode}= this.state;
    return (
   <View style={styles.container}>
        <TouchableOpacity style={styles.hamburger} onPress={() => this.ShowZeMenu()}>
         <Image
            style={styles.iconSize}
            source={require("../assets/menu.png")}/>
        </TouchableOpacity>
       <Modal
       animationType="fade"
       transparent={true}
       visible={showMenu}
        >
           <TouchableOpacity onPress={() => this.closeZeMenu()} style={styles.outsideModal}></TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalLogo}>
            <Image
            style={styles.logoSize}
            source={require("../assets/logo.png")}/>
            <TouchableOpacity style={styles.syncBtn}>
            <Text style={styles.syncText}> Sync. Calendar</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.menuOptions}>
            <Image
            style={styles.iconMenu}
            source={require("../assets/bus.png")}/>
              <Text>Shuttle Bus Schedule</Text>
              </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.switchToEvent()}
            style={styles.menuOptions}>
            <Image
            style={styles.iconMenu}
            source={require("../assets/event.png")}/>
              <Text>Events</Text>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={() => this.switchToSettings()}
              style={styles.menuOptions}>
              <Image
            style={styles.iconMenu}
            source={require("../assets/settings.png")}/>
              <Text>Settings</Text>
              </TouchableOpacity>
              <View style={styles.aboutLine}></View>
              <TouchableOpacity style={styles.menuOptions}>
              <Text>About</Text>
              </TouchableOpacity>
          </View>

      </Modal>

      <Modal
       animationType="fade"
       transparent={true}
       visible={showEvent}
        >
          <TouchableOpacity onPress={() => this.closeZeEvents()} style={styles.outsideModal}></TouchableOpacity>
            <View style={styles.modalEventSettingsContainer}>
        <Text>Choose a buiding to display the events ... </Text>
            <View style={styles.pickContainer}>
            <Picker
                  selectedValue={building}
                  style={styles.buildPicker}
                  onValueChange={(itemValue) => this.setState({building:itemValue})}
                >
          {buildings.map((buildingItem) => (
             <Picker.Item
             key={buildingItem.getIdentifier()}
             label={buildingItem.getName()}
             value={buildingItem.getName()}/>
          ))}


            </Picker>
           </View>
           <Text>{'\n'}Today's Events:</Text>
              <CampusEventContainer buildingId={this.state.building.identifier}/>
           </View>
        </Modal>

        <Modal
       animationType="fade"
       transparent={true}
       visible={showSettings}
        >
          <TouchableOpacity onPress={() => this.closeZeSettings()} style={styles.outsideModal}></TouchableOpacity>
            <View style={styles.modalEventSettingsContainer}>
             <Text>Settings</Text>
             <ColorBlindSettings setColorBlindMode={setColorBlindMode.bind(this)} colorBlindMode={colorBlindMode} closeZeSettings={this.closeZeSettings.bind(this)}/>
            </View>
        </Modal>
     </View>
    );
  }
}

export default Menu;
