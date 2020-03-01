import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text,Image } from 'react-native';
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
  positionBtn:{     
    alignSelf: 'flex-end',
    flexDirection:'column',
    zIndex:2,
    position:'absolute',
    bottom:140,
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
    },

  iconSize:{
     height:25,
     width:25,
    },
  container:{
        height:'100%',
        width:'100%',
        alignSelf: 'stretch',
        flexDirection:'column',
        alignItems:'center',
        zIndex:2,
        position:'absolute',
        shadowColor: "#000",
    },
});

class CampusToggleButton extends Component<
  { setMapLocation(latitude: number, longitude: number): void },
  { currentCampusView: String, ready: Boolean, coordinate: {latitude: number, longitude: number}, error:String}
> {
  constructor(props) {
    super(props);

    this.state = {
      currentCampusView: 'SGW',
      ready: true,
      coordinate: {latitude:null, longitude:null},
      error: null
    };
  }
  componentDidMount(){
    let options = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    };
    this.setState({ready:false, error: null });
    navigator.geolocation.getCurrentPosition( 
        this.success,this.failure,options);}
    
        success = (position) => {
            this.setState({
                ready:true,
                coordinate: {latitude: position.coords.latitude,longitude:position.coords.longitude }
            })
        }
        failure = (err) => {
            this.setState({error: err.message});
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
    const { setMapLocation } = this.props;
    const { currentCampusView } = this.state;
    if ((currentCampusView == 'SGW' || currentCampusView=='Current') && campusSelected == 'Loyola') {
        this.setState({ currentCampusView: 'Loyola' })
        setMapLocation(45.4582, -73.6405);
    } else if ((currentCampusView == 'Loyola' || currentCampusView=='Current') && campusSelected == 'SGW') {
        this.setState({ currentCampusView: 'SGW' })
        setMapLocation(45.497406, -73.577102);
    }
    else if ((currentCampusView=='Loyola' || currentCampusView=='SGW') && campusSelected == 'Current'){
        this.setState({ currentCampusView: 'Current' })
        setMapLocation(this.state.coordinate.latitude,this.state.coordinate.longitude);
       
    }
}

  render() {
    return (
    <View style={styles.container}>
      <View style={styles.campusToggle}>
        <TouchableOpacity
          style={this.buttonStyling('SGW')}
          onPress={() => this.toggleCampusView('SGW')}
        >
          <Text testID="toggle-sgw" style={styles.buttonText}>
            SGW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="toggle-loyola-button"
          style={this.buttonStyling('Loyola')}
          onPress={() => this.toggleCampusView('Loyola')}
        >
          <Text testID="toggle-loyola" style={styles.buttonText}>
            Loyola
          </Text>
        </TouchableOpacity>
      </View>
        
        <View style={styles.positionBtn}>
            <TouchableOpacity  onPress={() => this.toggleCampusView('Current')}> 
        <Image style={styles.iconSize} source={require ('../assets/cp.png')}/>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CampusToggleButton;
