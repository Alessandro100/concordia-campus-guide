import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CampusEvent from '../classes/CampusEvent';

type CampusEventComponentProps = {
   campusEvent: CampusEvent;
};

type CampusEventComponentState = {
};

class CampusEventComponent extends Component<CampusEventComponentProps, CampusEventComponentState> {
   
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View>
            <Text testID="EventTitle">Title: {this.props.campusEvent.title}</Text>
            <Text>Description: {this.props.campusEvent.description}</Text>
            <Text>Start: {this.props.campusEvent.startDate.toString()}</Text>
            <Text>End: {this.props.campusEvent.endDate.toString()}</Text>
            <Text>Location: {this.props.campusEvent.location}</Text>
            <Text>{"\n"}</Text>
         </View>
      );
   }
}
export default CampusEventComponent;