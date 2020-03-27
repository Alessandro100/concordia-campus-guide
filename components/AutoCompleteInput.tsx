import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import Location from '../classes/location';
import Colors from '../constants/Colors';
import indoorMap from '../constants/indoorTry';

const styles = StyleSheet.create({
container:{
flex:1,

},
modalSugg: {
  position:"absolute",
  top:40,
},

myInput:{
        width: 250,
        height: 40,
        borderColor: Colors.black,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        padding: 10,

  },
  suggestions:{
    zIndex:8,
    width: 250,
    height: 45,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    padding: 5,
}
}
);
type autoStates={
query:string;
places:any;
position:Location;
indoor:any;
indoorResults:any;
lat:number;
long:number;
indoorX: number;
indoorY:number;
indoorID:string;
type:string;
};
class Autocomplete extends Component<{myposition:Location,type:string},autoStates> {
  constructor(props) {
    super(props);
const { myposition,type }=this.props;
    this.state = {
      type,
    position:myposition,
     query:'',
     places:[],
     indoor:indoorMap.slice(0),
     indoorResults:[],
      lat:0,
      long:0,
      indoorX: 0,
      indoorY:0,
      indoorID:"",
  }
};
  async onChangeQuery(query:string){
  
    const { position, indoor}=this.state;
  
  this.setState({query:query});
    //add key
  let key = ""
  const api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&radius=1000&strictbounds&location=${position.getLatitude()},${position.getLongitude()}&key=${key}`;
  const results = await fetch(api);
  const json = await results.json();
  this.setState({places:json.predictions});


if (query.length===0){
  this.setState({indoorResults:[]});
}
else{
const filteredData = indoor.filter(x => String(x.identifier.toLowerCase()).includes(query.toLowerCase()));
this.setState({indoorResults:filteredData});}
};
getIndoorInfo(sugg:any){
  this.setState({query:""});
  this.setState({indoorX:sugg.coordinates.x});
  this.setState({indoorY:sugg.coordinates.y});
  this.setState({indoorID:sugg.coordinates.y});
}

 async getOutdoorInfo (sugg:any) {
  this.setState({query:""});
  let id = sugg.place_id;
  
  
    //add key
    let key = ""
    const api =`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,geometry&key=${key}`;
    const results = await fetch(api);
    const json = await results.json();  
    this.setState({lat:json.result.geometry.location.lat});
    this.setState({long:json.result.geometry.location.lng});
};
  
showSuggestions(){
  const {indoorResults, places}=this.state;
  const indoorSuggestions = indoorResults.map(suggestion => (
    <Text onPress={() => this.getIndoorInfo(suggestion)} key={suggestion.identifier} style={styles.suggestions}>{suggestion.identifier}</Text>
      ));
    const  placesSuggestions  = places.map(prediction => (
    <Text onPress={() => this.getOutdoorInfo(prediction)} key={prediction.id} style={styles.suggestions}>{prediction.description}</Text>
    ));
  
    return(
      <View style={styles.modalSugg}> 
       {indoorSuggestions} 
       {placesSuggestions}
      </View>
    );
};

  render() {
 
  const { query,type } = this.state;
    
    return (

     <View style={styles.container}>
       <TextInput
       style={styles.myInput}
       placeholder={type}
       value={query}
       onChangeText={(query) => this.onChangeQuery(query)}
       />
        {this.showSuggestions()} 

     </View>
    );
  }
}
export default Autocomplete;
