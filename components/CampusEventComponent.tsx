import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CampusEvent from '../classes/CampusEvent';

type CampusEventComponentProps = {
   
};

type CampusEventComponentState = {
   campusEvent: CampusEvent;
};

class CampusEventComponent extends Component<CampusEventComponentProps, CampusEventComponentState> {
   
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View>
            <Text>Title: {this.state.campusEvent.title}</Text>
            <Text>Description: {this.state.campusEvent.description}</Text>
            <Text>Start: {this.state.campusEvent.startDate}</Text>
            <Text>End: {this.state.campusEvent.endDate}</Text>
            <Text>Location: {this.state.campusEvent.location}</Text>
         </View>
      );
   }
}
export default CampusEventComponent;