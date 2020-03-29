import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Modal, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import indoorMap from '../constants/indoorTry';
import { REACT_APP_GOOGLE_PLACES_API } from 'react-native-dotenv';

const styles = StyleSheet.create({
container:{
  flex:1,
  },
  mytext:{
    color:Colors.grey,
  },
}
);
type autoStates={
    query:string;
    places:any;
    indoor:any;
    indoorResults:any;
    lat:number;
    long:number;
    indoorX: number;
    indoorY:number;
    indoorID:string;
    modalVisible:boolean;
};
type autoProps ={
  lat:number;
  lng:number;
  type:string;
  styleInput:any;
  styleSugg:any;
  btnStyle:any;
};

class Autocomplete extends Component<autoProps,autoStates> {
  constructor(props) {
    super(props);
    const {lat, lng} = this.props;
    this.state = {
     modalVisible:false,
     query:'',
     places:[],
     indoor:indoorMap.slice(0),
     indoorResults:[],
     lat:lat,
     long:lng,
     indoorX: 0,
     indoorY:0,
     indoorID:"", 
  }
};
  async onChangeQuery(query:string){
  
    const { indoor, lat, long }=this.state;
  
        this.setState({query:query});
        const api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&radius=1000&strictbounds&location=${lat},${long}&key=${REACT_APP_GOOGLE_PLACES_API}`;
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

    this.setState({modalVisible:false});
    this.setState({query:sugg.identifier})
    this.setState({indoorX:sugg.coordinates.x});
    this.setState({indoorY:sugg.coordinates.y});
    this.setState({indoorID:sugg.coordinates.y});
    
};

 async getOutdoorInfo (sugg:any) {
    
      
      this.setState({modalVisible:false});
      this.setState({query:sugg.description})
      let id = sugg.place_id;
       
        const api =`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,geometry&key=${REACT_APP_GOOGLE_PLACES_API}`;
        const results = await fetch(api);
        const json = await results.json();  
        this.setState({lat:json.result.geometry.location.lat});
        this.setState({long:json.result.geometry.location.lng});
};

  modalVisible(){
    this.setState({modalVisible:true});
  }

  render() {
  const {indoorResults, places, query,modalVisible}=this.state;
  const {styleInput,styleSugg,btnStyle,type}= this.props;
  let value ="";
  if (query.length>0){
    value=query
  }
  else {
    value=type
  }
  const indoorSuggestions = indoorResults.map(suggestion => (
      <Text onPress={() => this.getIndoorInfo(suggestion)} key={suggestion.identifier} style={styleSugg}>{suggestion.identifier}</Text>
      ));
  const  placesSuggestions  = places.map(prediction => (
      <Text onPress={() => this.getOutdoorInfo(prediction)} key={prediction.id} style={styleSugg}>{prediction.description}</Text>
    ));

    return (
     <View style={styles.container}>
      
  
       <TouchableOpacity
        onPress={() => this.modalVisible()}
        style={btnStyle}>
          <View>
            <Text numberOfLines={1} style={styles.mytext}>{value}</Text>
        </View>
       </TouchableOpacity>

      
     <Modal transparent={true} visible={modalVisible}>
     <TextInput
       autoFocus={true}
       style={styleInput}
       placeholder={type}
       value={query}
       onChangeText={(query) => this.onChangeQuery(query)}
       />
      {indoorSuggestions} 
      {placesSuggestions}
      </Modal>
      </View>
    );
  }
}
export default Autocomplete;
