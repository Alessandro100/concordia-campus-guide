import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../constants/Colors';
import Autocomplete from './AutoCompleteInput';
import Location from '../classes/location';
const styles = StyleSheet.create({
    modal: {
        height: 170,
        width: '100%',
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
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
        paddingTop:10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 4,
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
    
      sizeColumn1: {
        width: 40,
        paddingLeft: 10,
      },
      iconSize: {
        height: 25,
        width: 25,
      },
      sizeColumn2: {
        alignItems: 'center',
        flexDirection: 'column',
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
      sizeColumn3: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
  position: Location;
};
class InputBtn extends Component<{position:Location}, inputState> {
  constructor(props) {
    super(props);
const {position} = this.props;
    this.state = {
      inputModal: false,
      startInput: '',
      endInput: '',
      position:position,
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
    const { inputModal,position } = this.state;
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
            <Autocomplete type="Start" myposition={position}/>
            <Autocomplete type="Destination" myposition={position}/>
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