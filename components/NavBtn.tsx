import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import ShowDirection from './ShowDirection';

const styles = StyleSheet.create({
 
   
  navBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    zIndex: 2,
    position: 'absolute',
    bottom: 230,
    right: 30,
    backgroundColor: Colors.primaryColor,
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


type navState = {
  display:boolean;
};

type navProps = {
    start_x:number;
    start_y:number
    end_x:number;
    end_y:number;
    sid:string;
    eid:string;
    getNavInfo(x:number,y:number,type:string,id:string,inOrOut:boolean):void;
};
class Navbtn extends Component<navProps,navState> {
  constructor(props) {
    super(props);

    this.state = {
        display:false, 
         
    };
  }
  getDirections() {
      const {start_x,start_y,end_x,end_y,sid,eid}= this.props;
        
// resest all info after show direction
// const { getNavInfo }=this.props;
//  getNavInfo(-1,-1,"Start","",true);
//  getNavInfo(-1,-1,"End","",true);

  };

  render() {
    return (
        <View style={styles.navBtn}>
        <TouchableOpacity testID="navBtn" onPress={() => this.getDirections()}>
          <Image style={styles.iconSize} source={require('../assets/directions.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Navbtn;
 