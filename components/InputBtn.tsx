import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, TextInput, Image } from "react-native";

const styles = StyleSheet.create({
  modal:{
      height:170,
    width:'100%',
      alignSelf: 'stretch',
      flexDirection:'column',
      alignItems:'center',
      zIndex:2,
      position:'absolute',
      top:25,
      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  
  },
      
  row1:{
      height:120,
      
      alignSelf: 'stretch',
      flexDirection:'row',
      alignItems:'center',
      zIndex:2,
      position:'relative',
  },
  row2:{
      
      alignSelf: 'stretch',
      flexDirection:'row',
      justifyContent:'space-around',
      backgroundColor:'white',
      zIndex:2,
      position:'relative',
      paddingLeft:5,
      paddingRight:5,
  },

  sizeColumn1:{
    width:40, 
   paddingLeft:10
  
  },
  iconSize:{
      height:25,
      width:25,
  },
 sizeColumn2:{  
    
      alignItems:'center',
      flexDirection:'column',
             
     },

  bigDot:{
      borderRadius:50,
      backgroundColor:'blue',
      height:13,
      width:13,
      marginTop:5,
      marginBottom:5

  },
  dest: {
      height:25,
      width:25,
      marginTop:3
      
  },
  dots: {
      height:25,
      width:25,
      
  },
  sizeColumn3:{
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
     
  },
  inputStyling:{
      width:240,
      height:40,
      borderColor:'black',
      backgroundColor:'white',
      borderWidth:0.5,  
      padding:10,
      margin:5,
      borderRadius:5
      
  },

  sizeColumn4:{
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
     paddingLeft:10
  },
  invert:{
      marginTop:20,
      height:30,
      width:30,
  },
  
 navOptions:{ 
      
      flexDirection: 'row',
      alignItems:'center',
      borderRadius:30,
      borderWidth:0.5,
      padding:5,
      
   
  },
  optionTxt:{
      fontSize:12,
      padding:5
  },

  navBtn:{
      alignSelf: 'flex-end',
      flexDirection:'column',
      zIndex:2,
      position:'absolute',
      bottom:50,
      right:30,
      backgroundColor:'white',
      borderRadius:50,
      padding:20 ,
      shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
      }
});
type inputState = {
inputModal:Boolean;
};

class InputBtn extends Component <{}, inputState> {
  constructor(props) {
    super(props);
   this.state = {
        inputModal: false,
      };}
    
      showInput() {
        
          if (this.state.inputModal==false){
        this.setState({inputModal: true})}
      }
    
      hideInput() {
       
          if (this.state.inputModal==true){
        this.setState({inputModal: false})}
      }
    
   
    render() {
       
        if (this.state.inputModal== false){
          return (
        
            <View style={styles.navBtn}>
                
            <TouchableOpacity onPress={() => this.showInput()}>   
                        <Image style={styles.iconSize} source={require ('../assets/nav.png')}/>
            </TouchableOpacity>

            </View> 
         
          );
        }
        if (this.state.inputModal == true){
            return(
                
              <View style={styles.modal}>
              <View style={styles.row1}>
          
                <TouchableOpacity style={styles.sizeColumn1} onPress={() => this.hideInput()}>   
                        <Image style={styles.iconSize} source={require ('../assets/back.png')}/>
                </TouchableOpacity>
                       <View style={styles.sizeColumn2}>
                    
                       <View style={styles.bigDot}></View>
                       <Image style={styles.dots} source={require ('../assets/dots.png')}/>
                        <Image style={styles.dest} source={require ('../assets/dest.png')}/>
                        </View>
           
                        <View style={styles.sizeColumn3}>
                            <TextInput style={styles.inputStyling} placeholder='Start point'/>
                            <TextInput style={styles.inputStyling} placeholder='Destination'/>
                        </View>
                        <View style={styles.sizeColumn4}>
                        <TouchableOpacity  >   
                        <Image style={styles.iconSize} source={require ('../assets/dots.png')}/>
                        </TouchableOpacity>  
                        <TouchableOpacity >   
                        <Image style={styles.invert} source={require ('../assets/inverse.png')}/>
                        </TouchableOpacity>   
                        </View>  
              </View>
              <View style={styles.row2}>
              <TouchableOpacity style={styles.navOptions}>   
                        <Image style={styles.iconSize} source={require ('../assets/concordia.png')}/>
                        <Text style={styles.optionTxt}>25min</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navOptions}>   
                        <Image style={styles.iconSize} source={require ('../assets/car.png')}/>
                        <Text style={styles.optionTxt}>15min</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navOptions}>  
                        <Image style={styles.iconSize} source={require ('../assets/walk.png')}/>
                        <Text style={styles.optionTxt}>55min</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navOptions}>   
                        <Image style={styles.iconSize} source={require ('../assets/bike.png')}/>
                        <Text style={styles.optionTxt}>35min</Text>
                </TouchableOpacity>

              </View>

              </View>
            )  

    }
           
        }
    }
    



export default InputBtn;
