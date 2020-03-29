import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import Autocomplete from './AutoCompleteInput';
import Location from '../classes/location'

const autocompleteStyle = StyleSheet.create({
  btnStyling:{
    width: 250,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10,
},
startSuggestions:{
  position:"relative",
  left:65,
  top:55,
  zIndex:10,
  width: 250,
  height: 45,
  borderColor: Colors.black,
  backgroundColor: Colors.white,
  borderWidth: 0.5,
  padding: 5,
},
startInput:{
  position:"absolute",
  left:65,
  top:18,
  width: 250,
  height: 40,
  borderColor: Colors.black,
  backgroundColor: Colors.white,
  borderWidth: 0.5,
  padding: 10,
},
  destSuggestions:{
    position:"relative",
    left:65,
    top:66,
    zIndex:10,
    width: 250,
    height: 45,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 5,
  },
  destInput:{
    position:"relative",
    left:65,
    top:69.5,
    width: 250,
    height: 40,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 10,
  },
  
});

const styles = StyleSheet.create({
  modal: {
    height: 170,
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    top: 25,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  row1: {
    
    height: 120,
    zIndex:100,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',

    position: 'relative',
  },
  row2: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    zIndex: 2,
    position: 'relative',
    paddingLeft: 5,
    paddingRight: 5,
  },
  iconSize: {
    height: 25,
    width: 25,
  },
  sizeColumn1: {
    width: 40,
    paddingLeft: 10,
  },
  sizeColumn2: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  sizeColumn3: {
    paddingTop:17,
    flexDirection: 'column',
    zIndex:10,
  },

  bigDot: {
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
    height: 13,
    width: 13,
    marginTop: 5,
    marginBottom: 5,
  },
  dest: {
    height: 25,
    width: 25,
    marginTop: 3,
  },
  dots: {
    height: 25,
    width: 25,
  },
  sizeColumn4: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  invert: {
    marginTop: 20,
    height: 30,
    width: 30,
  },

  navOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.5,
    padding: 5,
  },
  optionTxt: {
    fontSize: 12,
    padding: 5,
  },

  navBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    zIndex: 2,
    position: 'absolute',
    bottom: 50,
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
});


type inputState = {
  inputModal: boolean;
  startInput: string;
  endInput: string;
  lat: number;
  long:number;
  position:Location;
};
type inputProps = {
  lat:number;
  lng:number;
  setMapLocation(position:Location):void;
  getNavInfo(x:number,y:number,type:string,id:string,inOrOut:boolean):void;
};
class InputBtn extends Component<inputProps, inputState> {
  constructor(props) {
    super(props);
const {lat,lng} = this.props;
    this.state = {

      inputModal: false,
      startInput: '',
      endInput: '',
      lat:lat,
      long:lng,
      position:new Location(0,0),
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
    const { inputModal, lat, long,position} = this.state;
    position.setLatitude(Number(lat));
    position.setLongitude(Number(long));
    if (inputModal === false) {
     
      // if the inputModal is false, then show nav button
      return (
        <View style={styles.navBtn}>
          <TouchableOpacity testID="navBtn" onPress={() => this.showInput()}>
            <Image style={styles.iconSize} source={require('../assets/nav.png')} />
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
            <Image style={styles.iconSize} source={require('../assets/back.png')} />
          </TouchableOpacity>
          <View style={styles.sizeColumn2}>
            <View style={styles.bigDot} />
            <Image style={styles.dots} source={require('../assets/dots.png')} />
            <Image style={styles.dest} source={require('../assets/dest.png')} />
          </View>

          <View style={styles.sizeColumn3}>
           <Autocomplete getNavInfo={this.props.getNavInfo} setMapLocation={this.props.setMapLocation} btnStyle ={autocompleteStyle.btnStyling} styleSugg={autocompleteStyle.startSuggestions} styleInput={autocompleteStyle.startInput} type="Start" lat={lat} lng={long}/>
           <Autocomplete getNavInfo={this.props.getNavInfo} setMapLocation={this.props.setMapLocation} btnStyle ={autocompleteStyle.btnStyling} styleSugg={autocompleteStyle.destSuggestions} styleInput={autocompleteStyle.destInput} type="Destination" lat={lat} lng={long}/>
          </View>
          <View style={styles.sizeColumn4}>
            <TouchableOpacity>
              <Image style={styles.iconSize} source={require('../assets/dots.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.invert} source={require('../assets/inverse.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.navOptions}>
            <Image style={styles.iconSize} source={require('../assets/concordia.png')} />
            <Text style={styles.optionTxt}>25min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image style={styles.iconSize} source={require('../assets/car.png')} />
            <Text style={styles.optionTxt}>15min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image style={styles.iconSize} source={require('../assets/walk.png')} />
            <Text style={styles.optionTxt}>55min</Text>
          </View>
          <View style={styles.navOptions}>
            <Image style={styles.iconSize} source={require('../assets/bike.png')} />
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

export default InputBtn;
 