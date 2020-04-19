import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CampusEvent from '../classes/CampusEvent';

type GoogleEventComponentProps = {
    campusEvent: CampusEvent;
};

type GoogleEventComponentState = {
};

class GoogleEventComponent extends Component<GoogleEventComponentProps, GoogleEventComponentState> {
   
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <View>
            <Text>{this.props.campusEvent.title}</Text>
            <Text>{this.props.campusEvent.description}</Text>
            <Text>From: {this.props.campusEvent.startDate.toString()}</Text>
            <Text>To: {this.props.campusEvent.endDate.toString()}</Text>
            <Text>Location: {this.props.campusEvent.location}</Text>
        </View>
        );
    }
}
export default GoogleEventComponent;