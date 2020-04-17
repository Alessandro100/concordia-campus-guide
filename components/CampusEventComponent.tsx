import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import CampusEvent from "../classes/CampusEvent";
import Colors from "../constants/Colors";

const eventStyle = StyleSheet.create({
  container: {
    marginTop:10,
    padding: 10,
    borderWidth: 0.5,
  },
  textBold: {
    fontWeight: "bold",
    color:Colors.primaryColor,
  },
});

type CampusEventComponentProps = {
  campusEvent: CampusEvent;
};

type CampusEventComponentState = {};

class CampusEventComponent extends Component<
  CampusEventComponentProps,
  CampusEventComponentState
> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={eventStyle.container}>
         <Text style={eventStyle.textBold}>Today's Events {"\n"}</Text>
        <Text style={eventStyle.textBold} testID="EventTitle">Title:</Text>
        <Text>{this.props.campusEvent.title}</Text>
        <Text style={eventStyle.textBold}>Description: </Text>
        <Text> {this.props.campusEvent.description}</Text>
        <Text style={eventStyle.textBold}>Start: </Text>
        <Text>{this.props.campusEvent.startDate.toString()}</Text>
        <Text style={eventStyle.textBold}>End: </Text>
        <Text>{this.props.campusEvent.endDate.toString()}</Text>
        <Text style={eventStyle.textBold}>Location: </Text>
        <Text>{this.props.campusEvent.location}</Text>
        <Text>{"\n"}</Text>
      </View>
    );
  }
}
export default CampusEventComponent;
